/**
 * SQL Query Runner Tool
 * Execute SQL queries with real-time results and query history
 */
class SqlQueryTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Execute query button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'execute-sql-btn') {
                this.executeSqlQuery();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-database text-primary"></i>
                        SQL Query Runner
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">SQL Query</h2>
                                <textarea 
                                    id="sql-input" 
                                    class="textarea textarea-bordered h-64 font-mono" 
                                    placeholder="Enter your SQL query here..."
                                >SELECT * FROM tools_usage;</textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('sql-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="execute-sql-btn">
                                        Execute Query
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Results</h2>
                                <div id="sql-results" class="min-h-64">
                                    <p class="text-base-content/70">Enter a SQL query and click Execute to see results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Query History</h2>
                                <div id="query-history" class="max-h-64 overflow-y-auto">
                                    <p class="text-base-content/70">Loading query history...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async executeSqlQuery() {
        const query = document.getElementById('sql-input')?.value.trim();
        const resultsDiv = document.getElementById('sql-results');

        if (!query || !resultsDiv) return;

        if (!window.dbManager || !window.dbManager.isReady()) {
            resultsDiv.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Database not ready. Please wait a moment and try again.</div>';
            return;
        }

        try {
            const result = window.dbManager.executeQuery(query);

            if (result.success) {
                if (result.result && result.result.length > 0) {
                    const table = result.result[0];
                    let html = '<div class="overflow-x-auto">';
                    html += '<table class="table table-zebra w-full">';

                    // Header
                    if (table.columns) {
                        html += '<thead><tr>';
                        table.columns.forEach(col => {
                            html += `<th>${col}</th>`;
                        });
                        html += '</tr></thead>';
                    }

                    // Rows
                    if (table.values && table.values.length > 0) {
                        html += '<tbody>';
                        table.values.forEach(row => {
                            html += '<tr>';
                            row.forEach(cell => {
                                html += `<td>${cell !== null ? cell : '<span class="text-base-content/50">NULL</span>'}</td>`;
                            });
                            html += '</tr>';
                        });
                        html += '</tbody>';
                    }

                    html += '</table></div>';

                    if (table.values) {
                        html += `<div class="mt-4 text-sm text-base-content/70">
                            Rows: ${table.values.length} | Execution time: ${result.executionTime.toFixed(2)}ms
                        </div>`;
                    }

                    resultsDiv.innerHTML = html;
                } else {
                    resultsDiv.innerHTML = `<div class="alert alert-success">
                        <i class="fas fa-check-circle"></i> Query executed successfully. 
                        Rows affected: ${result.rowsAffected} | Time: ${result.executionTime.toFixed(2)}ms
                    </div>`;
                }
            } else {
                resultsDiv.innerHTML = `<div class="alert alert-error">
                    <i class="fas fa-exclamation-circle"></i> Error: ${result.error}
                </div>`;
            }

            // Refresh query history
            this.loadQueryHistory();

        } catch (error) {
            resultsDiv.innerHTML = `<div class="alert alert-error">
                <i class="fas fa-exclamation-circle"></i> Error: ${error.message}
            </div>`;
        }
    }

    loadQueryHistory() {
        if (!window.dbManager || !window.dbManager.isReady()) return;

        const history = window.dbManager.getQueryHistory(10);
        const historyDiv = document.getElementById('query-history');

        if (!historyDiv) return;

        if (history.length === 0) {
            historyDiv.innerHTML = '<p class="text-base-content/70">No query history yet.</p>';
            return;
        }

        let html = '<div class="space-y-2">';
        history.forEach(item => {
            const [id, query, resultCount, executionTime, createdAt] = item;
            html += `<div class="bg-base-200 p-3 rounded">
                <div class="text-sm font-mono break-all">${query}</div>
                <div class="text-xs text-base-content/70 mt-1">
                    Results: ${resultCount} | Time: ${executionTime.toFixed(2)}ms | ${new Date(createdAt).toLocaleString()}
                </div>
            </div>`;
        });
        html += '</div>';

        historyDiv.innerHTML = html;
    }

    initialize() {
        // Load initial query history
        setTimeout(() => this.loadQueryHistory(), 1000);
    }
}

// Create global instance
const sqlQueryTool = new SqlQueryTool();
window.sqlQueryTool = sqlQueryTool;
