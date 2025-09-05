/**
 * Database management system using SQL.js
 */
class DatabaseManager {
    constructor() {
        this.db = null;
        this.SQL = null;
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Initialize SQL.js
            this.SQL = await initSqlJs({
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
            });

            // Try to load existing database file
            let dbData = null;
            try {
                const response = await fetch('database/tools.db');
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    dbData = new Uint8Array(arrayBuffer);
                    console.log('Loaded existing database file');
                }
            } catch (error) {
                console.log('No existing database file found, creating new one');
            }

            // Create database from file or new
            if (dbData && dbData.length > 0) {
                this.db = new this.SQL.Database(dbData);
                console.log('Database loaded from file');
            } else {
                this.db = new this.SQL.Database();
                console.log('Created new database');
            }

            this.isInitialized = true;

            // Create initial tables
            this.createInitialTables();

            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Failed to initialize database:', error);
            this.isInitialized = false;
        }
    }

    createInitialTables() {
        if (!this.db) return;

        try {
            // Create a sample table for demonstration
            this.db.exec(`
                CREATE TABLE IF NOT EXISTS tools_usage (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tool_name TEXT NOT NULL,
                    usage_count INTEGER DEFAULT 1,
                    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create a table for storing user notes
            this.db.exec(`
                CREATE TABLE IF NOT EXISTS user_notes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    content TEXT,
                    tool_name TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create a table for storing query history
            this.db.exec(`
                CREATE TABLE IF NOT EXISTS query_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query TEXT NOT NULL,
                    result_count INTEGER,
                    execution_time REAL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Insert some sample data
            this.db.exec(`
                INSERT OR IGNORE INTO tools_usage (tool_name, usage_count) VALUES 
                ('text-case', 0),
                ('text-counter', 0),
                ('json-formatter', 0),
                ('color-picker', 0),
                ('base64', 0),
                ('url-encoder', 0),
                ('regex-tester', 0),
                ('hash-generator', 0);
            `);

        } catch (error) {
            console.error('Error creating initial tables:', error);
        }
    }

    // Execute a SQL query
    executeQuery(sql, params = []) {
        if (!this.db || !this.isInitialized) {
            throw new Error('Database not initialized');
        }

        try {
            const startTime = performance.now();
            const result = this.db.exec(sql, params);
            const endTime = performance.now();
            const executionTime = endTime - startTime;

            // Log query to history
            this.logQuery(sql, result[0]?.values?.length || 0, executionTime);

            // Auto-save disabled - user will save manually

            return {
                success: true,
                result: result,
                executionTime: executionTime,
                rowsAffected: this.db.getRowsModified()
            };
        } catch (error) {
            console.error('Query execution error:', error);
            return {
                success: false,
                error: error.message,
                result: null
            };
        }
    }

    // Log query to history
    logQuery(query, resultCount, executionTime) {
        try {
            this.db.exec(`
                INSERT INTO query_history (query, result_count, execution_time) 
                VALUES (?, ?, ?)
            `, [query, resultCount, executionTime]);
        } catch (error) {
            console.error('Error logging query:', error);
        }
    }

    // Get all tables
    getTables() {
        const result = this.executeQuery(`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
            ORDER BY name
        `);

        return result.success ? result.result[0]?.values || [] : [];
    }

    // Get table schema
    getTableSchema(tableName) {
        const result = this.executeQuery(`PRAGMA table_info(${tableName})`);
        return result.success ? result.result[0]?.values || [] : [];
    }

    // Get table data with pagination
    getTableData(tableName, limit = 100, offset = 0) {
        const result = this.executeQuery(`
            SELECT * FROM ${tableName} 
            LIMIT ${limit} OFFSET ${offset}
        `);

        return result.success ? result.result[0] || null : null;
    }

    // Get query history
    getQueryHistory(limit = 50) {
        const result = this.executeQuery(`
            SELECT * FROM query_history 
            ORDER BY created_at DESC 
            LIMIT ${limit}
        `);

        return result.success ? result.result[0]?.values || [] : [];
    }

    // Update tool usage
    updateToolUsage(toolName) {
        try {
            this.db.exec(`
                UPDATE tools_usage 
                SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP 
                WHERE tool_name = ?
            `, [toolName]);
        } catch (error) {
            console.error('Error updating tool usage:', error);
        }
    }

    // Get tool usage statistics
    getToolUsageStats() {
        const result = this.executeQuery(`
            SELECT tool_name, usage_count, last_used 
            FROM tools_usage 
            ORDER BY usage_count DESC
        `);

        return result.success ? result.result[0]?.values || [] : [];
    }

    // Save user note
    saveNote(title, content, toolName = null) {
        const result = this.executeQuery(`
            INSERT INTO user_notes (title, content, tool_name) 
            VALUES (?, ?, ?)
        `, [title, content, toolName]);

        return result.success;
    }

    // Get user notes
    getNotes(toolName = null) {
        let query = 'SELECT * FROM user_notes';
        let params = [];

        if (toolName) {
            query += ' WHERE tool_name = ?';
            params.push(toolName);
        }

        query += ' ORDER BY updated_at DESC';

        const result = this.executeQuery(query, params);
        return result.success ? result.result[0]?.values || [] : [];
    }

    // Export database as SQL dump
    exportDatabase() {
        if (!this.db) return null;

        try {
            return this.db.export();
        } catch (error) {
            console.error('Error exporting database:', error);
            return null;
        }
    }

    // Import database from SQL dump
    importDatabase(data) {
        try {
            console.log('DatabaseManager: Starting import...');
            console.log('Data type:', typeof data);
            console.log('Data length:', data.length);
            console.log('Data constructor:', data.constructor.name);
            console.log('SQL available:', this.SQL !== null);

            if (!this.SQL) {
                console.error('DatabaseManager: SQL.js not loaded');
                return false;
            }

            this.db = new this.SQL.Database(data);
            this.isInitialized = true;

            console.log('DatabaseManager: Import successful');
            return true;
        } catch (error) {
            console.error('DatabaseManager: Error importing database:', error);
            console.error('Error details:', error.message);
            return false;
        }
    }

    // Get database statistics
    getDatabaseStats() {
        const tables = this.getTables();
        const stats = {
            tableCount: tables.length,
            tables: []
        };

        tables.forEach(table => {
            const tableName = table[0];
            const schema = this.getTableSchema(tableName);
            const data = this.getTableData(tableName, 1);

            stats.tables.push({
                name: tableName,
                columnCount: schema.length,
                rowCount: data ? data.values.length : 0,
                columns: schema.map(col => ({
                    name: col[1],
                    type: col[2],
                    notNull: col[3],
                    defaultValue: col[4],
                    primaryKey: col[5]
                }))
            });
        });

        return stats;
    }

    // Check if database is ready
    isReady() {
        return this.isInitialized && this.db !== null;
    }

    saveToFile() {
        if (!this.db) return;

        try {
            const data = this.db.export();
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            // Create a temporary download link
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tools.db';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('Database saved to file - please place it in the database/ folder');

            // Show notification to user
            if (window.toolsApp) {
                window.toolsApp.showNotification('Database saved! Place the downloaded file in the database/ folder.', 'info');
            }
        } catch (error) {
            console.error('Failed to save database:', error);
        }
    }

    // Auto-save functionality removed - user saves manually
}

// Create global database manager instance
const dbManager = new DatabaseManager();
window.dbManager = dbManager;
