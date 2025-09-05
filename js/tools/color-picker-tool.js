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
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-palette text-primary"></i>
                        Color Picker & Converter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Color Picker</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Choose a color</span>
                                    </label>
                                    <input type="color" id="color-picker" class="input input-bordered h-16" value="#3b82f6" />
                                </div>
                                
                                <div class="mt-6 space-y-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HEX</span>
                                        </label>
                                        <input type="text" id="hex-value" class="input input-bordered" readonly />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">RGB</span>
                                        </label>
                                        <input type="text" id="rgb-value" class="input input-bordered" readonly />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HSL</span>
                                        </label>
                                        <input type="text" id="hsl-value" class="input input-bordered" readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Color Preview</h2>
                                <div id="color-preview" class="w-full h-32 rounded-lg border-2 border-base-300 mb-4"></div>
                                
                                <div class="space-y-2">
                                    <button class="btn btn-primary btn-sm copy-btn w-full" data-copy="document.getElementById('hex-value').value">
                                        Copy HEX
                                    </button>
                                    <button class="btn btn-secondary btn-sm copy-btn w-full" data-copy="document.getElementById('rgb-value').value">
                                        Copy RGB
                                    </button>
                                    <button class="btn btn-accent btn-sm copy-btn w-full" data-copy="document.getElementById('hsl-value').value">
                                        Copy HSL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateColorValues(hex) {
        // Update preview
        const preview = document.getElementById('color-preview');
        if (preview) preview.style.backgroundColor = hex;

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

    initialize() {
        // Initialize with default color
        this.updateColorValues('#3b82f6');
    }
}

// Create global instance
const colorPickerTool = new ColorPickerTool();
window.colorPickerTool = colorPickerTool;
