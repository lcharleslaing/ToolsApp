/**
 * Base64 Encoder/Decoder Tool
 * Encode and decode text using Base64
 */
class Base64Tool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('base64-tab')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Encode/Decode buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'encode-base64-btn') {
                this.encodeBase64();
            } else if (e.target.id === 'decode-base64-btn') {
                this.decodeBase64();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-key text-primary"></i>
                        Base64 Encoder/Decoder
                    </h1>
                    
                    <div class="tabs tabs-boxed mb-6">
                        <a class="tab tab-active base64-tab" data-tab="encode">Encode</a>
                        <a class="tab base64-tab" data-tab="decode">Decode</a>
                    </div>
                    
                    <div id="encode-tab" class="tab-content">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Text to Base64</h2>
                                <textarea 
                                    id="encode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter text to encode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('encode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="encode-base64-btn">
                                        Encode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Base64 Output</span>
                                    </label>
                                    <textarea id="encode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('encode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="decode-tab" class="tab-content hidden">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Base64 to Text</h2>
                                <textarea 
                                    id="decode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter Base64 to decode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('decode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" id="decode-base64-btn">
                                        Decode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Decoded Text</span>
                                    </label>
                                    <textarea id="decode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('decode-output').value">
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
        document.querySelectorAll('.base64-tab').forEach(t => t.classList.remove('tab-active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('tab-active');

        // Show/hide content
        document.getElementById('encode-tab').classList.toggle('hidden', tab !== 'encode');
        document.getElementById('decode-tab').classList.toggle('hidden', tab !== 'decode');
    }

    encodeBase64() {
        const input = document.getElementById('encode-input')?.value;
        const output = document.getElementById('encode-output');

        if (input && output) {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            output.value = encoded;
        }
    }

    decodeBase64() {
        const input = document.getElementById('decode-input')?.value;
        const output = document.getElementById('decode-output');

        if (input && output) {
            try {
                const decoded = decodeURIComponent(escape(atob(input)));
                output.value = decoded;
            } catch (error) {
                output.value = 'Error: Invalid Base64 string';
            }
        }
    }

    initialize() {
        console.log('Initializing Base64 tool...');
        // Ensure the encode tab is active by default
        this.switchTab('encode');
        console.log('Base64 tool initialized');
    }
}

// Create global instance
const base64Tool = new Base64Tool();
window.base64Tool = base64Tool;
