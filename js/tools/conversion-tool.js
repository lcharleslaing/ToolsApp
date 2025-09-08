/**
 * Comprehensive Conversion Tool
 * Handles all types of unit conversions, measurements, and data transformations
 */
class ConversionTool {
    constructor() {
        this.categories = {
            length: {
                name: 'Length',
                icon: 'fas fa-ruler',
                units: {
                    'mm': { name: 'Millimeter', factor: 0.001 },
                    'cm': { name: 'Centimeter', factor: 0.01 },
                    'm': { name: 'Meter', factor: 1 },
                    'km': { name: 'Kilometer', factor: 1000 },
                    'in': { name: 'Inch', factor: 0.0254 },
                    'ft': { name: 'Foot', factor: 0.3048 },
                    'yd': { name: 'Yard', factor: 0.9144 },
                    'mi': { name: 'Mile', factor: 1609.344 }
                }
            },
            weight: {
                name: 'Weight',
                icon: 'fas fa-weight',
                units: {
                    'mg': { name: 'Milligram', factor: 0.000001 },
                    'g': { name: 'Gram', factor: 0.001 },
                    'kg': { name: 'Kilogram', factor: 1 },
                    'oz': { name: 'Ounce', factor: 0.0283495 },
                    'lb': { name: 'Pound', factor: 0.453592 },
                    'st': { name: 'Stone', factor: 6.35029 },
                    't': { name: 'Metric Ton', factor: 1000 }
                }
            },
            temperature: {
                name: 'Temperature',
                icon: 'fas fa-thermometer-half',
                units: {
                    'c': { name: 'Celsius', factor: 1, offset: 0 },
                    'f': { name: 'Fahrenheit', factor: 5 / 9, offset: -32 },
                    'k': { name: 'Kelvin', factor: 1, offset: -273.15 },
                    'r': { name: 'Rankine', factor: 5 / 9, offset: -491.67 }
                }
            },
            area: {
                name: 'Area',
                icon: 'fas fa-square',
                units: {
                    'mm²': { name: 'Square Millimeter', factor: 0.000001 },
                    'cm²': { name: 'Square Centimeter', factor: 0.0001 },
                    'm²': { name: 'Square Meter', factor: 1 },
                    'km²': { name: 'Square Kilometer', factor: 1000000 },
                    'in²': { name: 'Square Inch', factor: 0.00064516 },
                    'ft²': { name: 'Square Foot', factor: 0.092903 },
                    'yd²': { name: 'Square Yard', factor: 0.836127 },
                    'ac': { name: 'Acre', factor: 4046.86 },
                    'ha': { name: 'Hectare', factor: 10000 }
                }
            },
            volume: {
                name: 'Volume',
                icon: 'fas fa-cube',
                units: {
                    'ml': { name: 'Milliliter', factor: 0.000001 },
                    'l': { name: 'Liter', factor: 0.001 },
                    'm³': { name: 'Cubic Meter', factor: 1 },
                    'cm³': { name: 'Cubic Centimeter', factor: 0.000001 },
                    'in³': { name: 'Cubic Inch', factor: 0.0000163871 },
                    'ft³': { name: 'Cubic Foot', factor: 0.0283168 },
                    'gal': { name: 'US Gallon', factor: 0.00378541 },
                    'qt': { name: 'US Quart', factor: 0.000946353 },
                    'pt': { name: 'US Pint', factor: 0.000473176 },
                    'fl oz': { name: 'US Fluid Ounce', factor: 0.0000295735 }
                }
            },
            time: {
                name: 'Time',
                icon: 'fas fa-clock',
                units: {
                    'ns': { name: 'Nanosecond', factor: 0.000000001 },
                    'μs': { name: 'Microsecond', factor: 0.000001 },
                    'ms': { name: 'Millisecond', factor: 0.001 },
                    's': { name: 'Second', factor: 1 },
                    'min': { name: 'Minute', factor: 60 },
                    'h': { name: 'Hour', factor: 3600 },
                    'd': { name: 'Day', factor: 86400 },
                    'wk': { name: 'Week', factor: 604800 },
                    'mo': { name: 'Month', factor: 2629746 },
                    'yr': { name: 'Year', factor: 31556952 },
                    'decimal': { name: 'Decimal Hours', factor: 1, special: 'decimal' }
                }
            },
            data: {
                name: 'Data Storage',
                icon: 'fas fa-hdd',
                units: {
                    'b': { name: 'Bit', factor: 0.125 },
                    'B': { name: 'Byte', factor: 1 },
                    'KB': { name: 'Kilobyte', factor: 1024 },
                    'MB': { name: 'Megabyte', factor: 1048576 },
                    'GB': { name: 'Gigabyte', factor: 1073741824 },
                    'TB': { name: 'Terabyte', factor: 1099511627776 },
                    'PB': { name: 'Petabyte', factor: 1125899906842624 }
                }
            },
            speed: {
                name: 'Speed',
                icon: 'fas fa-tachometer-alt',
                units: {
                    'm/s': { name: 'Meters per Second', factor: 1 },
                    'km/h': { name: 'Kilometers per Hour', factor: 0.277778 },
                    'mph': { name: 'Miles per Hour', factor: 0.44704 },
                    'ft/s': { name: 'Feet per Second', factor: 0.3048 },
                    'knot': { name: 'Knot', factor: 0.514444 },
                    'c': { name: 'Speed of Light', factor: 299792458 }
                }
            },
            pressure: {
                name: 'Pressure',
                icon: 'fas fa-compress',
                units: {
                    'Pa': { name: 'Pascal', factor: 1 },
                    'kPa': { name: 'Kilopascal', factor: 1000 },
                    'MPa': { name: 'Megapascal', factor: 1000000 },
                    'bar': { name: 'Bar', factor: 100000 },
                    'atm': { name: 'Atmosphere', factor: 101325 },
                    'psi': { name: 'Pound per Square Inch', factor: 6894.76 },
                    'torr': { name: 'Torr', factor: 133.322 }
                }
            },
            energy: {
                name: 'Energy',
                icon: 'fas fa-bolt',
                units: {
                    'J': { name: 'Joule', factor: 1 },
                    'kJ': { name: 'Kilojoule', factor: 1000 },
                    'MJ': { name: 'Megajoule', factor: 1000000 },
                    'cal': { name: 'Calorie', factor: 4.184 },
                    'kcal': { name: 'Kilocalorie', factor: 4184 },
                    'Wh': { name: 'Watt Hour', factor: 3600 },
                    'kWh': { name: 'Kilowatt Hour', factor: 3600000 },
                    'BTU': { name: 'British Thermal Unit', factor: 1055.06 }
                }
            }
        };

        this.currentCategory = 'length';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Category selection buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('conversion-category-btn') || e.target.closest('.conversion-category-btn')) {
                const button = e.target.classList.contains('conversion-category-btn') ? e.target : e.target.closest('.conversion-category-btn');
                const category = button.dataset.category;
                console.log('Category selected:', category);
                this.switchCategory(category);
            }
        });

        // Input changes
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('conversion-input')) {
                this.convertAll();
            }
        });

        // Unit selection changes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('conversion-unit')) {
                this.convertAll();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-exchange-alt text-primary"></i>
                        Conversion Tool
                    </h1>
                    
                    <!-- Category Selection -->
                    <div class="card bg-base-100 shadow-xl mb-6">
                        <div class="card-body">
                            <h2 class="card-title">Select Conversion Type</h2>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                ${Object.entries(this.categories).map(([key, category]) => `
                                    <button class="btn btn-outline conversion-category-btn ${key === this.currentCategory ? 'btn-primary' : ''}" 
                                            data-category="${key}">
                                        <i class="${category.icon}"></i>
                                        ${category.name}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Conversion Interface -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Input Section -->
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Input</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Value</span>
                                    </label>
                                    <input type="text" id="conversion-input" class="input input-bordered conversion-input" 
                                           placeholder="Enter value to convert (e.g., 15:30 for time)" />
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">From Unit</span>
                                    </label>
                                    <select id="conversion-from-unit" class="select select-bordered conversion-unit">
                                        ${this.getUnitOptions()}
                                    </select>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">To Unit</span>
                                    </label>
                                    <select id="conversion-to-unit" class="select select-bordered conversion-unit">
                                        ${this.getUnitOptions()}
                                    </select>
                                </div>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="conversionTool.clearInputs()">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="conversionTool.convertAll()">
                                        Convert
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Output Section -->
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Result</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Converted Value</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="conversion-result" class="input input-bordered flex-1" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('conversion-result').value">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Conversions -->
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Quick Conversions</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="quick-conversions">
                                    <!-- Quick conversion buttons will be generated here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Conversion History -->
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Conversion History</h2>
                                <div id="conversion-history" class="max-h-64 overflow-y-auto">
                                    <p class="text-base-content/70">No conversions yet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getUnitOptions() {
        const category = this.categories[this.currentCategory];
        return Object.entries(category.units).map(([key, unit]) =>
            `<option value="${key}">${unit.name} (${key})</option>`
        ).join('');
    }

    updateUnitSelects() {
        const fromSelect = document.getElementById('conversion-from-unit');
        const toSelect = document.getElementById('conversion-to-unit');
        if (fromSelect) {
            fromSelect.innerHTML = this.getUnitOptions();
        }
        if (toSelect) {
            toSelect.innerHTML = this.getUnitOptions();
        }
    }


    convertAll() {
        const inputValue = document.getElementById('conversion-input')?.value;
        const fromUnit = document.getElementById('conversion-from-unit')?.value;
        const toUnit = document.getElementById('conversion-to-unit')?.value;

        if (!inputValue || !fromUnit || !toUnit) return;

        const category = this.categories[this.currentCategory];
        const fromUnitData = category.units[fromUnit];
        const toUnitData = category.units[toUnit];

        if (!fromUnitData || !toUnitData) return;

        // Handle special time format conversions
        if (this.currentCategory === 'time') {
            this.handleTimeConversions(inputValue, fromUnit, toUnit, category);
            return;
        }

        // Regular numeric conversion
        const numericValue = parseFloat(inputValue);
        if (isNaN(numericValue)) return;

        // Convert to base unit first
        let baseValue;
        if (this.currentCategory === 'temperature') {
            baseValue = this.convertTemperatureToCelsius(numericValue, fromUnit);
        } else {
            baseValue = numericValue * fromUnitData.factor;
        }

        // Convert from base unit to target unit
        let convertedValue;
        if (this.currentCategory === 'temperature') {
            convertedValue = this.convertTemperatureFromCelsius(baseValue, toUnit);
        } else {
            convertedValue = baseValue / toUnitData.factor;
        }

        // Display the result
        const resultElement = document.getElementById('conversion-result');
        if (resultElement) {
            resultElement.value = this.formatNumber(convertedValue);
        }

        // Add to history
        this.addToHistory(numericValue, fromUnit, toUnit, category.name);
    }

    convertTemperatureToCelsius(value, fromUnit) {
        switch (fromUnit) {
            case 'c': return value;
            case 'f': return (value - 32) * 5 / 9;
            case 'k': return value - 273.15;
            case 'r': return (value - 491.67) * 5 / 9;
            default: return value;
        }
    }

    convertTemperatureFromCelsius(celsius, toUnit) {
        switch (toUnit) {
            case 'c': return celsius;
            case 'f': return celsius * 9 / 5 + 32;
            case 'k': return celsius + 273.15;
            case 'r': return celsius * 9 / 5 + 491.67;
            default: return celsius;
        }
    }

    handleTimeConversions(inputValue, fromUnit, toUnit, category) {
        // Check if input is in HH:MM format
        const timeFormatRegex = /^(\d{1,2}):(\d{2})$/;
        const timeMatch = inputValue.match(timeFormatRegex);

        let baseValue; // in hours

        if (timeMatch && fromUnit === 'h') {
            // Convert HH:MM to decimal hours
            const hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            baseValue = hours + (minutes / 60);
        } else {
            // Regular numeric conversion
            const numericValue = parseFloat(inputValue);
            if (isNaN(numericValue)) return;
            baseValue = numericValue * category.units[fromUnit].factor / 3600; // Convert to hours
        }

        // Convert from hours to target unit
        let convertedValue;
        const toUnitData = category.units[toUnit];

        if (toUnit === 'decimal') {
            // Special case for decimal hours
            convertedValue = baseValue;
        } else if (toUnit === 'h' && timeMatch) {
            // Convert decimal hours back to HH:MM format
            const hours = Math.floor(baseValue);
            const minutes = Math.round((baseValue - hours) * 60);
            convertedValue = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } else {
            // Regular conversion
            convertedValue = baseValue * 3600 / toUnitData.factor; // Convert from hours to target unit
        }

        // Display the result
        const resultElement = document.getElementById('conversion-result');
        if (resultElement) {
            if (toUnit === 'h' && timeMatch) {
                resultElement.value = convertedValue; // Don't format time strings
            } else {
                resultElement.value = this.formatNumber(convertedValue);
            }
        }

        // Add to history
        this.addToHistory(inputValue, fromUnit, toUnit, category.name);
    }

    formatNumber(num) {
        if (Math.abs(num) < 0.000001) return '0';
        if (Math.abs(num) < 0.01) return num.toExponential(6);
        if (Math.abs(num) < 1) return num.toFixed(8);
        if (Math.abs(num) < 1000) return num.toFixed(6);
        if (Math.abs(num) < 1000000) return num.toFixed(4);
        return num.toExponential(6);
    }

    clearInputs() {
        const input = document.getElementById('conversion-input');
        if (input) input.value = '';

        const result = document.getElementById('conversion-result');
        if (result) result.value = '';
    }

    switchCategory(category) {
        console.log('Switching to category:', category);
        this.currentCategory = category;
        this.updateUnitSelects();
        this.clearInputs();
        this.updateCategoryButtons();
    }

    updateCategoryButtons() {
        document.querySelectorAll('.conversion-category-btn').forEach(button => {
            const category = button.dataset.category;
            if (category === this.currentCategory) {
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');
            } else {
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline');
            }
        });
    }

    initialize() {
        console.log('Initializing conversion tool...');
        // Update unit selects and output fields
        this.updateUnitSelects();
        this.updateCategoryButtons();
        console.log('Conversion tool initialized');
    }

    addToHistory(value, fromUnit, toUnit, categoryName) {
        const history = this.getHistory();
        const entry = {
            id: Date.now(),
            value: value,
            fromUnit: fromUnit,
            toUnit: toUnit,
            category: categoryName,
            timestamp: new Date().toISOString()
        };

        history.unshift(entry);
        if (history.length > 50) history.pop(); // Keep only last 50 entries

        localStorage.setItem('conversion-history', JSON.stringify(history));
        this.updateHistoryDisplay();
    }

    getHistory() {
        const stored = localStorage.getItem('conversion-history');
        return stored ? JSON.parse(stored) : [];
    }

    updateHistoryDisplay() {
        const historyContainer = document.getElementById('conversion-history');
        if (!historyContainer) return;

        const history = this.getHistory();

        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="text-base-content/70">No conversions yet.</p>';
            return;
        }

        historyContainer.innerHTML = history.map(entry => `
            <div class="bg-base-200 p-3 rounded mb-2">
                <div class="flex justify-between items-center">
                    <div>
                        <span class="font-bold">${entry.value} ${entry.fromUnit}</span>
                        <span class="text-sm text-base-content/70">→ ${entry.toUnit || 'N/A'}</span>
                        <span class="text-sm text-base-content/70">in ${entry.category}</span>
                    </div>
                    <div class="text-xs text-base-content/50">
                        ${new Date(entry.timestamp).toLocaleString()}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Quick conversion methods
    getQuickConversions() {
        const quickConversions = {
            length: [
                { from: '1 m', to: '3.28 ft', desc: 'Meter to Feet' },
                { from: '1 km', to: '0.62 mi', desc: 'Kilometer to Miles' },
                { from: '1 in', to: '2.54 cm', desc: 'Inch to Centimeter' }
            ],
            temperature: [
                { from: '0°C', to: '32°F', desc: 'Freezing Point' },
                { from: '100°C', to: '212°F', desc: 'Boiling Point' },
                { from: '37°C', to: '98.6°F', desc: 'Body Temperature' }
            ],
            weight: [
                { from: '1 kg', to: '2.2 lb', desc: 'Kilogram to Pounds' },
                { from: '1 lb', to: '0.45 kg', desc: 'Pound to Kilograms' },
                { from: '1 oz', to: '28.35 g', desc: 'Ounce to Grams' }
            ]
        };

        return quickConversions[this.currentCategory] || [];
    }
}

// Create global instance
const conversionTool = new ConversionTool();
window.conversionTool = conversionTool;
