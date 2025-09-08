/**
 * URL Encoder/Decoder Tool
 * Encode and decode URLs
 */
class UrlEncoderTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('url-tab')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Encode/Decode buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'encode-url-btn') {
                this.encodeUrl();
            } else if (e.target.id === 'decode-url-btn') {
                this.decodeUrl();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-link text-primary"></i>
                        URL Encoder/Decoder
                    </h1>
                    
                    <div class="tabs tabs-boxed mb-6">
                        <a class="tab tab-active url-tab" data-tab="encode">Encode</a>
                        <a class="tab url-tab" data-tab="decode">Decode</a>
                    </div>
                    
                    <div id="url-encode-tab" class="tab-content">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">URL Encode</h2>
                                <textarea 
                                    id="url-encode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter URL or text to encode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('url-encode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="encode-url-btn">
                                        Encode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Encoded URL</span>
                                    </label>
                                    <textarea id="url-encode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('url-encode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="url-decode-tab" class="tab-content hidden">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">URL Decode</h2>
                                <textarea 
                                    id="url-decode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter encoded URL to decode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('url-decode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="decode-url-btn">
                                        Decode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Decoded URL</span>
                                    </label>
                                    <textarea id="url-decode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('url-decode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    switchTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.url-tab').forEach(t => t.classList.remove('tab-active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('tab-active');

        // Show/hide content
        document.getElementById('url-encode-tab').classList.toggle('hidden', tab !== 'encode');
        document.getElementById('url-decode-tab').classList.toggle('hidden', tab !== 'decode');
    }

    encodeUrl() {
        const input = document.getElementById('url-encode-input')?.value;
        const output = document.getElementById('url-encode-output');

        if (input && output) {
            const encoded = encodeURIComponent(input);
            output.value = encoded;
        }
    }

    decodeUrl() {
        const input = document.getElementById('url-decode-input')?.value;
        const output = document.getElementById('url-decode-output');

        if (input && output) {
            try {
                const decoded = decodeURIComponent(input);
                output.value = decoded;
            } catch (error) {
                output.value = 'Error: Invalid encoded URL';
            }
        }
    }

    initialize() {
        console.log('Initializing URL Encoder tool...');
        // Ensure the encode tab is active by default
        this.switchTab('encode');
        console.log('URL Encoder tool initialized');
    }
}

// Create global instance
const urlEncoderTool = new UrlEncoderTool();
window.urlEncoderTool = urlEncoderTool;
