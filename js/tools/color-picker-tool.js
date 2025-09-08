/**
 * Color Picker Tool
 * Pick colors and convert between HEX, RGB, and HSL formats
 */
class ColorPickerTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Color picker changes
        document.addEventListener('input', (e) => {
            if (e.target.id === 'color-picker') {
                this.updateColorValues(e.target.value);
            }
        });

        // Copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.copyToClipboard(e.target);
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-palette text-primary"></i>
                        Color Picker & Converter
                    </h1>
                    
                    <div class="max-w-2xl mx-auto">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Color Picker</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Choose a color</span>
                                    </label>
                                    <div class="flex items-center gap-4">
                                        <input type="color" id="color-picker" class="w-20 h-20 rounded-lg border-2 border-base-300 cursor-pointer" value="#3b82f6" />
                                        <div class="flex-1">
                                            <div class="text-sm text-base-content/70 mb-2">Selection Preview</div>
                                            <div id="current-color-preview" class="w-full h-12 rounded-lg border-2 border-base-300"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-6 space-y-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HEX</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="hex-value" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary btn-sm copy-btn w-12 h-12 p-0 ml-2" data-copy-target="hex-value" id="hex-swatch">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">RGB</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="rgb-value" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-secondary btn-sm copy-btn w-12 h-12 p-0 ml-2" data-copy-target="rgb-value" id="rgb-swatch">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HSL</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="hsl-value" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-accent btn-sm copy-btn w-12 h-12 p-0 ml-2" data-copy-target="hsl-value" id="hsl-swatch">
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

    updateColorValues(hex) {
        // Update selection preview
        const currentPreview = document.getElementById('current-color-preview');
        if (currentPreview) currentPreview.style.backgroundColor = hex;

        // Convert to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Update values
        const hexValue = document.getElementById('hex-value');
        if (hexValue) hexValue.value = hex.toUpperCase();

        const rgbValue = document.getElementById('rgb-value');
        if (rgbValue) rgbValue.value = `rgb(${r}, ${g}, ${b})`;

        // Convert to HSL
        const hsl = this.rgbToHsl(r, g, b);
        const hslValue = document.getElementById('hsl-value');
        if (hslValue) hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        // Update color swatches (now the copy buttons)
        const hexSwatch = document.getElementById('hex-swatch');
        if (hexSwatch) hexSwatch.style.backgroundColor = hex;

        const rgbSwatch = document.getElementById('rgb-swatch');
        if (rgbSwatch) rgbSwatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        const hslSwatch = document.getElementById('hsl-swatch');
        if (hslSwatch) hslSwatch.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    copyToClipboard(button) {
        const targetId = button.getAttribute('data-copy-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement && targetElement.value) {
            navigator.clipboard.writeText(targetElement.value).then(() => {
                // Show success feedback
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.classList.add('btn-success');
                button.classList.remove('btn-primary', 'btn-secondary', 'btn-accent');

                // Reset after 2 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('btn-success');
                    if (targetId === 'hex-value') {
                        button.classList.add('btn-primary');
                    } else if (targetId === 'rgb-value') {
                        button.classList.add('btn-secondary');
                    } else if (targetId === 'hsl-value') {
                        button.classList.add('btn-accent');
                    }
                }, 2000);

                // Show notification
                if (window.toolsApp) {
                    window.toolsApp.showNotification(`${targetId.toUpperCase()} value copied to clipboard!`, 'success');
                }
            }).catch(err => {
                console.error('Failed to copy: ', err);
                if (window.toolsApp) {
                    window.toolsApp.showNotification('Failed to copy to clipboard', 'error');
                }
            });
        }
    }

    initialize() {
        console.log('Initializing Color Picker tool...');
        // Initialize with default color
        this.updateColorValues('#3b82f6');
        console.log('Color Picker tool initialized');
    }
}

// Create global instance
const colorPickerTool = new ColorPickerTool();
window.colorPickerTool = colorPickerTool;
