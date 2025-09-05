/**
 * Tool Loader System
 * Manages loading and initialization of separate tool files
 */
class ToolLoader {
    constructor() {
        this.tools = new Map();
        this.loadedTools = new Set();
        this.init();
    }

    init() {
        // Register available tools
        this.registerTool('text-case', 'Text Case Converter', 'fas fa-text-height', 'textCaseTool');
        this.registerTool('conversion', 'Conversion Tool', 'fas fa-exchange-alt', 'conversionTool');
        this.registerTool('text-counter', 'Text Counter', 'fas fa-calculator', 'textCounterTool');
        this.registerTool('json-formatter', 'JSON Formatter', 'fas fa-code', 'jsonFormatterTool');
        this.registerTool('color-picker', 'Color Picker', 'fas fa-palette', 'colorPickerTool');
        this.registerTool('base64', 'Base64 Encoder/Decoder', 'fas fa-key', 'base64Tool');
        this.registerTool('url-encoder', 'URL Encoder/Decoder', 'fas fa-link', 'urlEncoderTool');
        this.registerTool('regex-tester', 'Regex Tester', 'fas fa-search', 'regexTesterTool');
        this.registerTool('hash-generator', 'Hash Generator', 'fas fa-fingerprint', 'hashGeneratorTool');
        this.registerTool('sql-query', 'SQL Query Runner', 'fas fa-database', 'sqlQueryTool');
        this.registerTool('db-manager', 'Database Manager', 'fas fa-table', 'dbManagerTool');
        this.registerTool('db-backup', 'Backup & Restore', 'fas fa-download', 'dbBackupTool');
    }

    registerTool(id, name, icon, globalVar) {
        this.tools.set(id, {
            name,
            icon,
            globalVar,
            loaded: false
        });
    }


    async getToolPage(toolId) {
        console.log(`Getting tool page for: ${toolId}`);

        // Get the tool instance directly
        const toolInfo = this.tools.get(toolId);
        if (!toolInfo) {
            console.error(`Tool info not found for: ${toolId}`);
            return this.getErrorPage(`Tool ${toolId} not found`);
        }

        console.log(`Tool info for ${toolId}:`, toolInfo);

        const toolInstance = window[toolInfo.globalVar];
        console.log(`Tool instance for ${toolId}:`, toolInstance);
        console.log(`Available global vars:`, Object.keys(window).filter(key => key.includes('Tool')));

        if (!toolInstance) {
            console.error(`Tool instance not found: ${toolInfo.globalVar}`);
            return this.getErrorPage(`Tool ${toolId} not found`);
        }

        // Get the page HTML
        const pageHTML = toolInstance.getPageHTML();

        // Initialize the tool if it has an initialize method
        if (typeof toolInstance.initialize === 'function') {
            setTimeout(() => toolInstance.initialize(), 100);
        }

        return pageHTML;
    }

    getErrorPage(message) {
        return `
            <div class="hero min-h-96">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold text-error">Error</h1>
                        <p class="py-6">${message}</p>
                        <button class="btn btn-primary" onclick="router.navigate('#home')">
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getToolInfo(toolId) {
        return this.tools.get(toolId);
    }

    getAllTools() {
        return Array.from(this.tools.entries()).map(([id, info]) => ({
            id,
            ...info
        }));
    }
}

// Create global tool loader instance
const toolLoader = new ToolLoader();
