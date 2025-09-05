/**
 * Regex Tester Tool
 * Test regular expressions with real-time matching
 */
class RegexTesterTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Test regex button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'test-regex-btn') {
                this.testRegex();
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-search text-primary"></i>
                        Regex Tester
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Pattern & Test String</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Regular Expression</span>
                                    </label>
                                    <input type="text" id="regex-pattern" class="input input-bordered font-mono" placeholder="Enter regex pattern..." />
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Test String</span>
                                    </label>
                                    <textarea id="test-string" class="textarea textarea-bordered h-32" placeholder="Enter text to test against the regex..."></textarea>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Flags</span>
                                    </label>
                                    <div class="flex gap-4">
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-g" class="checkbox checkbox-sm" checked />
                                            <span class="label-text ml-2">Global (g)</span>
                                        </label>
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-i" class="checkbox checkbox-sm" />
                                            <span class="label-text ml-2">Ignore case (i)</span>
                                        </label>
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-m" class="checkbox checkbox-sm" />
                                            <span class="label-text ml-2">Multiline (m)</span>
                                        </label>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-4" id="test-regex-btn">
                                    Test Regex
                                </button>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Results</h2>
                                <div id="regex-results" class="min-h-64">
                                    <p class="text-base-content/70">Enter a regex pattern and test string to see results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    testRegex() {
        const pattern = document.getElementById('regex-pattern')?.value;
        const testString = document.getElementById('test-string')?.value;
        const resultsDiv = document.getElementById('regex-results');

        if (!pattern || !testString || !resultsDiv) return;

        try {
            // Get flags
            let flags = '';
            if (document.getElementById('flag-g')?.checked) flags += 'g';
            if (document.getElementById('flag-i')?.checked) flags += 'i';
            if (document.getElementById('flag-m')?.checked) flags += 'm';

            const regex = new RegExp(pattern, flags);
            const matches = testString.match(regex);
            const globalMatches = [...testString.matchAll(regex)];

            let html = '<div class="space-y-4">';

            // Show if pattern matches
            if (matches) {
                html += '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Pattern matches!</div>';

                // Show matches
                html += '<div><h3 class="font-bold mb-2">Matches:</h3>';
                globalMatches.forEach((match, index) => {
                    html += `<div class="badge badge-primary mr-2 mb-2">${match[0]}</div>`;
                });
                html += '</div>';

                // Show match details
                html += '<div><h3 class="font-bold mb-2">Match Details:</h3>';
                globalMatches.forEach((match, index) => {
                    html += `<div class="bg-base-200 p-2 rounded mb-2">
                        <div class="text-sm">Match ${index + 1}: "${match[0]}"</div>
                        <div class="text-xs text-base-content/70">Index: ${match.index}, Length: ${match[0].length}</div>
                    </div>`;
                });
                html += '</div>';
            } else {
                html += '<div class="alert alert-error"><i class="fas fa-times-circle"></i> No matches found.</div>';
            }

            html += '</div>';
            resultsDiv.innerHTML = html;

        } catch (error) {
            resultsDiv.innerHTML = `<div class="alert alert-error"><i class="fas fa-exclamation-triangle"></i> Invalid regex: ${error.message}</div>`;
        }
    }

    initialize() {
        // No initialization needed
    }
}

// Create global instance
const regexTesterTool = new RegexTesterTool();
window.regexTesterTool = regexTesterTool;
