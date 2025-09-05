/**
 * Database Manager Tool
 * View database statistics, table information, and tool usage analytics
 */
class DbManagerTool {
    constructor() {
        this.currentDatabaseName = 'tools.db';
        this.currentDatabaseLocation = 'database/tools.db';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // View table button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-table-btn')) {
                const tableName = e.target.dataset.table;
                this.viewTable(tableName);
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-table text-primary"></i>
                        Database Manager
                    </h1>
                    
                    <!-- Database Information -->
                    <div class="card bg-base-100 shadow-xl mb-6">
                        <div class="card-body">
                            <h2 class="card-title">
                                <i class="fas fa-database text-info"></i>
                                Database Information
                            </h2>
                            <div id="db-info-display">
                                <div class="loading loading-spinner loading-md"></div>
                                <p class="text-base-content/70">Loading database information...</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Database Statistics</h2>
                                <div id="db-stats">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading database statistics...</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Tool Usage Statistics</h2>
                                <div id="tool-usage-stats">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading usage statistics...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Tables</h2>
                                <div id="tables-list">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading tables...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Database Actions</h2>
                                <div class="flex gap-4">
                                    <button class="btn btn-primary" onclick="dbManagerTool.saveDatabase()">
                                        <i class="fas fa-save"></i>
                                        Save Database
                                    </button>
                                    <button class="btn btn-outline" onclick="dbManagerTool.clearDatabase()">
                                        <i class="fas fa-trash"></i>
                                        Clear Database
                                    </button>
                                </div>
                                <div class="mt-4">
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle"></i>
                                        <div>
                                            <div class="font-bold">Manual Save</div>
                                            <div class="text-sm">Click "Save Database" to download the database file. Place it in the database/ folder to persist data.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadDatabaseStats() {
        console.log('Loading database stats...');
        console.log('dbManager available:', !!window.dbManager);
        console.log('dbManager ready:', window.dbManager?.isReady());

        if (!window.dbManager || !window.dbManager.isReady()) {
            console.log('Database not ready, retrying in 1 second...');
            // Add timeout to prevent infinite loading
            if (this.loadAttempts) {
                this.loadAttempts++;
            } else {
                this.loadAttempts = 1;
            }

            if (this.loadAttempts > 10) {
                console.error('Database failed to load after 10 attempts');
                const statsDiv = document.getElementById('db-stats');
                if (statsDiv) {
                    statsDiv.innerHTML = '<div class="alert alert-error">Database failed to initialize. Please refresh the page.</div>';
                }
                return;
            }

            setTimeout(() => this.loadDatabaseStats(), 1000);
            return;
        }

        try {
            const stats = window.dbManager.getDatabaseStats();
            const statsDiv = document.getElementById('db-stats');

            if (!statsDiv) return;

            console.log('Database stats:', stats);

            let html = '<div class="stats stats-vertical lg:stats-horizontal shadow">';
            html += `<div class="stat">
                <div class="stat-title">Tables</div>
                <div class="stat-value text-primary">${stats.tableCount}</div>
            </div>`;
            html += '</div>';

            if (stats.tables && stats.tables.length > 0) {
                html += '<div class="mt-4"><h3 class="font-bold mb-2">Table Details:</h3>';
                html += '<div class="space-y-2">';
                stats.tables.forEach(table => {
                    html += `<div class="bg-base-200 p-3 rounded">
                        <div class="font-bold">${table.name}</div>
                        <div class="text-sm text-base-content/70">
                            Columns: ${table.columnCount} | Rows: ${table.rowCount}
                        </div>
                    </div>`;
                });
                html += '</div></div>';
            } else {
                html += '<div class="mt-4"><p class="text-base-content/70">No tables found.</p></div>';
            }

            statsDiv.innerHTML = html;
        } catch (error) {
            console.error('Error loading database stats:', error);
            const statsDiv = document.getElementById('db-stats');
            if (statsDiv) {
                statsDiv.innerHTML = '<div class="alert alert-error">Error loading database statistics</div>';
            }
        }
    }

    async loadToolUsageStats() {
        console.log('Loading tool usage stats...');

        if (!window.dbManager || !window.dbManager.isReady()) {
            console.log('Database not ready for usage stats, retrying...');
            setTimeout(() => this.loadToolUsageStats(), 1000);
            return;
        }

        try {
            const usage = window.dbManager.getToolUsageStats();
            const usageDiv = document.getElementById('tool-usage-stats');

            if (!usageDiv) return;

            console.log('Tool usage stats:', usage);

            if (!usage || usage.length === 0) {
                usageDiv.innerHTML = '<p class="text-base-content/70">No usage data available.</p>';
                return;
            }

            let html = '<div class="space-y-2">';
            usage.forEach(item => {
                const [toolName, usageCount, lastUsed] = item;
                html += `<div class="flex justify-between items-center bg-base-200 p-3 rounded">
                    <div>
                        <div class="font-bold">${toolName}</div>
                        <div class="text-sm text-base-content/70">Last used: ${new Date(lastUsed).toLocaleDateString()}</div>
                    </div>
                    <div class="badge badge-primary">${usageCount} uses</div>
                </div>`;
            });
            html += '</div>';

            usageDiv.innerHTML = html;
        } catch (error) {
            console.error('Error loading tool usage stats:', error);
            const usageDiv = document.getElementById('tool-usage-stats');
            if (usageDiv) {
                usageDiv.innerHTML = '<div class="alert alert-error">Error loading usage statistics</div>';
            }
        }
    }

    async loadTablesList() {
        console.log('Loading tables list...');

        if (!window.dbManager || !window.dbManager.isReady()) {
            console.log('Database not ready for tables list, retrying...');
            setTimeout(() => this.loadTablesList(), 1000);
            return;
        }

        try {
            const tables = window.dbManager.getTables();
            const tablesDiv = document.getElementById('tables-list');

            if (!tablesDiv) return;

            console.log('Tables list:', tables);

            if (!tables || tables.length === 0) {
                tablesDiv.innerHTML = '<p class="text-base-content/70">No tables found.</p>';
                return;
            }

            let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
            tables.forEach(table => {
                const tableName = table[0];
                html += `<div class="card bg-base-200 shadow">
                    <div class="card-body p-4">
                        <h3 class="card-title text-sm">${tableName}</h3>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-sm view-table-btn" data-table="${tableName}">
                                View Data
                            </button>
                        </div>
                    </div>
                </div>`;
            });
            html += '</div>';

            tablesDiv.innerHTML = html;
        } catch (error) {
            console.error('Error loading tables list:', error);
            const tablesDiv = document.getElementById('tables-list');
            if (tablesDiv) {
                tablesDiv.innerHTML = '<div class="alert alert-error">Error loading tables</div>';
            }
        }
    }

    viewTable(tableName) {
        const query = `SELECT * FROM ${tableName} LIMIT 10`;
        const sqlInput = document.getElementById('sql-input');
        if (sqlInput) {
            sqlInput.value = query;
        }
        // Navigate to SQL query page
        if (window.router) {
            window.router.navigate('#sql-query');
        }
    }

    saveDatabase() {
        if (window.dbManager && window.dbManager.isReady()) {
            window.dbManager.saveToFile();
        } else {
            alert('Database not ready. Please wait a moment and try again.');
        }
    }

    clearDatabase() {
        if (confirm('Are you sure you want to clear all database data? This cannot be undone.')) {
            if (window.dbManager && window.dbManager.isReady()) {
                // Clear all tables
                window.dbManager.db.exec('DELETE FROM tools_usage');
                window.dbManager.db.exec('DELETE FROM query_history');
                window.dbManager.db.exec('DELETE FROM user_data');

                // Reload the data
                this.loadDatabaseStats();
                this.loadToolUsageStats();
                this.loadTablesList();

                if (window.toolsApp) {
                    window.toolsApp.showNotification('Database cleared successfully', 'success');
                }
            } else {
                alert('Database not ready. Please wait a moment and try again.');
            }
        }
    }

    loadDatabaseInfo() {
        if (!window.dbManager || !window.dbManager.isReady()) {
            setTimeout(() => this.loadDatabaseInfo(), 1000);
            return;
        }

        const infoDiv = document.getElementById('db-info-display');
        if (!infoDiv) return;

        // Get current database info
        const dbInfo = this.getCurrentDatabaseInfo();

        let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';

        html += `<div class="stat">
            <div class="stat-title">Database File</div>
            <div class="stat-value text-primary font-mono text-lg">${dbInfo.filename}</div>
        </div>`;

        html += `<div class="stat">
            <div class="stat-title">Location</div>
            <div class="stat-value text-secondary font-mono text-sm">${dbInfo.location}</div>
        </div>`;

        html += `<div class="stat">
            <div class="stat-title">Status</div>
            <div class="stat-value text-success">${dbInfo.status}</div>
        </div>`;

        html += `<div class="stat">
            <div class="stat-title">Type</div>
            <div class="stat-value text-info">${dbInfo.type}</div>
        </div>`;

        html += '</div>';

        html += '<div class="mt-4">';
        html += '<div class="alert alert-info">';
        html += '<i class="fas fa-info-circle"></i>';
        html += '<div>';
        html += '<div class="font-bold">Database Location</div>';
        html += '<div class="text-sm">Your database is stored locally in the <code>database/</code> folder. Use the "Save Database" button below to download the current database file.</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        infoDiv.innerHTML = html;
    }

    getCurrentDatabaseInfo() {
        return {
            filename: this.currentDatabaseName,
            location: this.currentDatabaseLocation,
            status: window.dbManager.isInitialized ? 'Loaded' : 'Not Loaded',
            type: 'SQLite Database',
            lastModified: new Date().toLocaleString()
        };
    }

    updateDatabaseInfo(filename, location) {
        this.currentDatabaseName = filename;
        this.currentDatabaseLocation = location;
        this.loadDatabaseInfo();
    }

    initialize() {
        console.log('Initializing database manager tool...');
        console.log('dbManager available:', !!window.dbManager);

        // Load all data with a small delay to ensure database is ready
        setTimeout(() => {
            this.loadDatabaseInfo();
            this.loadDatabaseStats();
            this.loadToolUsageStats();
            this.loadTablesList();
        }, 500);
    }

    // Method to refresh database info when page is accessed
    refreshDatabaseInfo() {
        this.loadDatabaseInfo();
    }
}

// Create global instance
const dbManagerTool = new DbManagerTool();
window.dbManagerTool = dbManagerTool;
