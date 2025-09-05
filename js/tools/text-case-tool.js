/**
 * Text Case Converter Tool
 * Converts text between various case formats
 */
class TextCaseTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Text input changes
        document.addEventListener('input', (e) => {
            if (e.target.id === 'text-input') {
                this.convertTextCase(e.target.value);
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-text-height text-primary"></i>
                        Text Case Converter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Input Text</h2>
                                <textarea 
                                    id="text-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter your text here..."
                                >Hello World! This is a sample text for testing the case converter.</textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('text-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm copy-btn" data-copy="document.getElementById('text-input').value">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Converted Text</h2>
                                <div class="space-y-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">UPPERCASE</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="uppercase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('uppercase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">lowercase</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="lowercase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('lowercase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Title Case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="titlecase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('titlecase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">camelCase</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="camelcase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('camelcase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">snake_case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="snakecase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('snakecase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">kebab-case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="kebabcase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('kebabcase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
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

    convertTextCase(text) {
        // Uppercase
        const uppercaseOutput = document.getElementById('uppercase-output');
        if (uppercaseOutput) uppercaseOutput.value = text.toUpperCase();

        // Lowercase
        const lowercaseOutput = document.getElementById('lowercase-output');
        if (lowercaseOutput) lowercaseOutput.value = text.toLowerCase();

        // Title Case
        const titlecaseOutput = document.getElementById('titlecase-output');
        if (titlecaseOutput) {
            titlecaseOutput.value = text.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        // Camel Case
        const camelcaseOutput = document.getElementById('camelcase-output');
        if (camelcaseOutput) {
            camelcaseOutput.value = text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        }

        // Snake Case
        const snakecaseOutput = document.getElementById('snakecase-output');
        if (snakecaseOutput) {
            snakecaseOutput.value = text.replace(/\W+/g, '_')
                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                .toLowerCase();
        }

        // Kebab Case
        const kebabcaseOutput = document.getElementById('kebabcase-output');
        if (kebabcaseOutput) {
            kebabcaseOutput.value = text.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
        }
    }

    initialize() {
        // Convert initial sample text
        const textInput = document.getElementById('text-input');
        if (textInput) {
            this.convertTextCase(textInput.value);
        }
    }
}

// Create global instance
const textCaseTool = new TextCaseTool();
window.textCaseTool = textCaseTool;
