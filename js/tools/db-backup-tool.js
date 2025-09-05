/**
 * Database Backup & Restore Tool
 * Export and import database files for backup purposes
 */
class DbBackupTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Export/Import buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'export-db-btn') {
                this.exportDatabase();
            } else if (e.target.id === 'import-db-btn') {
                this.importDatabase();
            }
        });

        // File input change event
        document.addEventListener('change', (e) => {
            if (e.target.id === 'import-file') {
                console.log('File selected:', e.target.files[0]);
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-download text-primary"></i>
                        Backup & Restore
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Export Database</h2>
                                <p class="text-base-content/70 mb-4">Download your database as a SQL file for backup purposes.</p>
                                <button class="btn btn-primary" id="export-db-btn">
                                    <i class="fas fa-download"></i>
                                    Export Database
                                </button>
                                <div class="mt-4">
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle"></i>
                                        <div>
                                            <div class="font-bold">Export includes:</div>
                                            <div class="text-sm">All tables, data, and schema information</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Import Database</h2>
                                <p class="text-base-content/70 mb-4">Restore your database from a previously exported database file.</p>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Select Database File</span>
                                    </label>
                                    <input type="file" id="import-file" class="file-input file-input-bordered w-full" accept=".db" />
                                    <label class="label">
                                        <span class="label-text-alt">Supported formats: .db (SQLite database files)</span>
                                    </label>
                                </div>
                                
                                <div class="flex gap-2 mt-4">
                                    <button class="btn btn-secondary" id="import-db-btn">
                                        <i class="fas fa-upload"></i>
                                        Import Database
                                    </button>
                                    <button class="btn btn-outline btn-sm" onclick="window.toolsApp.showNotification('Test error message - this should stay visible for 10 seconds', 'error')">
                                        Test Error
                                    </button>
                                </div>
                                
                                <div class="mt-4">
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle"></i>
                                        <div>
                                            <div class="font-bold">How to import:</div>
                                            <div class="text-sm">1. Click "Export Database" to download a .db file<br/>2. Select the .db file using the file input above<br/>3. Click "Import Database" to restore your data</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-4">
                                    <div class="alert alert-warning">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <div>
                                            <div class="font-bold">Warning:</div>
                                            <div class="text-sm">Importing will replace your current database</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Database Information</h2>
                                <div id="db-info">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading database information...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    exportDatabase() {
        if (!window.dbManager || !window.dbManager.isReady()) {
            alert('Database not ready. Please wait a moment and try again.');
            return;
        }

        try {
            const data = window.dbManager.exportDatabase();
            if (data) {
                const blob = new Blob([data], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tools-database-${new Date().toISOString().split('T')[0]}.db`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                if (window.toolsApp) {
                    window.toolsApp.showNotification('Database exported! Place it in the database/ folder to persist data.', 'success');
                }
            } else {
                if (window.toolsApp) {
                    window.toolsApp.showNotification('Failed to export database', 'error');
                }
            }
        } catch (error) {
            console.error('Export error:', error);
            if (window.toolsApp) {
                window.toolsApp.showNotification('Error exporting database: ' + error.message, 'error');
            }
        }
    }

    importDatabase() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput?.files[0];

        console.log('Import button clicked');
        console.log('File input:', fileInput);
        console.log('Selected file:', file);

        if (!file) {
            alert('Please select a file to import.');
            return;
        }

        if (!window.dbManager || !window.dbManager.isReady()) {
            alert('Database not ready. Please wait a moment and try again.');
            return;
        }

        console.log('Starting file read...');
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                console.log('File read complete, processing data...');
                const data = new Uint8Array(e.target.result);
                console.log('Data size:', data.length);

                const success = window.dbManager.importDatabase(data);
                console.log('Import result:', success);

                if (success) {
                    if (window.toolsApp) {
                        window.toolsApp.showNotification('Database imported successfully!', 'success');
                    }

                    // Update database info in manager
                    if (window.dbManagerTool) {
                        const fileName = file.name || 'imported-database.db';
                        const location = `database/${fileName}`;
                        window.dbManagerTool.updateDatabaseInfo(fileName, location);
                    }

                    this.loadDatabaseInfo();
                } else {
                    if (window.toolsApp) {
                        window.toolsApp.showNotification('Failed to import database', 'error');
                    }
                }
            } catch (error) {
                console.error('Import error:', error);
                console.error('Error stack:', error.stack);
                console.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    cause: error.cause
                });
                if (window.toolsApp) {
                    window.toolsApp.showNotification('Error importing database: ' + error.message, 'error');
                }
            }
        };

        reader.onerror = (error) => {
            console.error('File read error:', error);
            console.error('File read error details:', {
                name: error.name,
                message: error.message,
                type: error.type,
                target: error.target
            });
            if (window.toolsApp) {
                window.toolsApp.showNotification('Error reading file: ' + error.message, 'error');
            }
        };

        reader.readAsArrayBuffer(file);
    }

    loadDatabaseInfo() {
        if (!window.dbManager || !window.dbManager.isReady()) {
            setTimeout(() => this.loadDatabaseInfo(), 1000);
            return;
        }

        const stats = window.dbManager.getDatabaseStats();
        const infoDiv = document.getElementById('db-info');

        if (!infoDiv) return;

        let html = '<div class="stats stats-vertical lg:stats-horizontal shadow">';
        html += `<div class="stat">
            <div class="stat-title">Tables</div>
            <div class="stat-value text-primary">${stats.tableCount}</div>
        </div>`;
        html += `<div class="stat">
            <div class="stat-title">Total Rows</div>
            <div class="stat-value text-secondary">${stats.tables.reduce((sum, table) => sum + table.rowCount, 0)}</div>
        </div>`;
        html += '</div>';

        if (stats.tables.length > 0) {
            html += '<div class="mt-4"><h3 class="font-bold mb-2">Table Summary:</h3>';
            html += '<div class="overflow-x-auto">';
            html += '<table class="table table-zebra w-full">';
            html += '<thead><tr><th>Table Name</th><th>Columns</th><th>Rows</th></tr></thead>';
            html += '<tbody>';
            stats.tables.forEach(table => {
                html += `<tr>
                    <td class="font-mono">${table.name}</td>
                    <td>${table.columnCount}</td>
                    <td>${table.rowCount}</td>
                </tr>`;
            });
            html += '</tbody></table></div></div>';
        }

        infoDiv.innerHTML = html;
    }

    initialize() {
        // Load initial database info
        this.loadDatabaseInfo();
    }
}

// Create global instance
const dbBackupTool = new DbBackupTool();
window.dbBackupTool = dbBackupTool;
