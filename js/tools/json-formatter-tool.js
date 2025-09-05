/**
 * JSON Formatter Tool
 * Formats and validates JSON with syntax highlighting
 */
class JsonFormatterTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Format button click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'format-json-btn') {
                this.formatJson();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-code text-primary"></i>
                        JSON Formatter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Input JSON</h2>
                                <textarea 
                                    id="json-input" 
                                    class="textarea textarea-bordered h-96 font-mono" 
                                    placeholder="Paste your JSON here..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('json-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="format-json-btn">
                                        Format
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Formatted JSON</h2>
                                <pre id="json-output" class="code-block h-96 overflow-auto"></pre>
                                <div class="card-actions justify-end mt-4">
                                    <button class="btn btn-primary btn-sm copy-btn" data-copy="document.getElementById('json-output').textContent">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatJson() {
        const input = document.getElementById('json-input')?.value;
        const output = document.getElementById('json-output');

        if (!input || !output) return;

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            output.textContent = formatted;
            output.className = 'code-block h-96 overflow-auto text-success';
        } catch (error) {
            output.textContent = 'Error: ' + error.message;
            output.className = 'code-block h-96 overflow-auto text-error';
        }
    }

    initialize() {
        // No initialization needed
    }
}

// Create global instance
const jsonFormatterTool = new JsonFormatterTool();
window.jsonFormatterTool = jsonFormatterTool;
