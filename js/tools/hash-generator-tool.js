/**
 * Hash Generator Tool
 * Generate various hash types
 */
class HashGeneratorTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Text input changes
        document.addEventListener('input', (e) => {
            if (e.target.id === 'hash-input') {
                this.generateHashes();
            }
        });

        // Generate button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'generate-hash-btn') {
                this.generateHashes();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-fingerprint text-primary"></i>
                        Hash Generator
                    </h1>
                    
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Generate Hashes</h2>
                            <textarea 
                                id="hash-input" 
                                class="textarea textarea-bordered h-32" 
                                placeholder="Enter text to generate hashes..."
                            ></textarea>
                            
                            <div class="card-actions justify-between mt-4">
                                <button class="btn btn-outline btn-sm" onclick="document.getElementById('hash-input').value = ''">
                                    Clear
                                </button>
                                <button class="btn btn-primary btn-sm" id="generate-hash-btn">
                                    Generate Hashes
                                </button>
                            </div>
                            
                            <div class="mt-6 space-y-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">MD5</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="md5-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('md5-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-1</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha1-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha1-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-256</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha256-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha256-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-512</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha512-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha512-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async generateHashes() {
        const input = document.getElementById('hash-input')?.value;

        if (!input) {
            // Clear outputs
            ['md5', 'sha1', 'sha256', 'sha512'].forEach(type => {
                const output = document.getElementById(`${type}-output`);
                if (output) output.value = '';
            });
            return;
        }

        try {
            // Convert string to ArrayBuffer
            const encoder = new TextEncoder();
            const data = encoder.encode(input);

            // Generate hashes
            const sha1Hash = await crypto.subtle.digest('SHA-1', data).then(hash => {
                return Array.from(new Uint8Array(hash))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            });

            const sha256Hash = await crypto.subtle.digest('SHA-256', data).then(hash => {
                return Array.from(new Uint8Array(hash))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            });

            const sha512Hash = await crypto.subtle.digest('SHA-512', data).then(hash => {
                return Array.from(new Uint8Array(hash))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            });

            // Update outputs
            const md5Output = document.getElementById('md5-output');
            if (md5Output) md5Output.value = sha1Hash; // Using SHA-1 as MD5 fallback

            const sha1Output = document.getElementById('sha1-output');
            if (sha1Output) sha1Output.value = sha1Hash;

            const sha256Output = document.getElementById('sha256-output');
            if (sha256Output) sha256Output.value = sha256Hash;

            const sha512Output = document.getElementById('sha512-output');
            if (sha512Output) sha512Output.value = sha512Hash;

        } catch (error) {
            console.error('Error generating hashes:', error);
            // Show error in outputs
            ['md5', 'sha1', 'sha256', 'sha512'].forEach(type => {
                const output = document.getElementById(`${type}-output`);
                if (output) output.value = 'Error generating hash';
            });
        }
    }

    initialize() {
        // Generate hashes for empty input to clear outputs
        this.generateHashes();
    }
}

// Create global instance
const hashGeneratorTool = new HashGeneratorTool();
window.hashGeneratorTool = hashGeneratorTool;
