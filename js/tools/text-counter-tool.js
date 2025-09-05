/**
 * Text Counter Tool
 * Analyzes text with character, word, line, and paragraph counts
 */
class TextCounterTool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Text input changes
        document.addEventListener('input', (e) => {
            if (e.target.id === 'counter-input') {
                this.analyzeText(e.target.value);
            }
        });
    }

    getPageHTML() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-calculator text-primary"></i>
                        Text Counter
                    </h1>
                    
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Text Analysis</h2>
                            <textarea 
                                id="counter-input" 
                                class="textarea textarea-bordered h-64" 
                                placeholder="Enter your text here for analysis..."
                            ></textarea>
                            
                            <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
                                <div class="stat">
                                    <div class="stat-title">Characters</div>
                                    <div class="stat-value text-primary" id="char-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Words</div>
                                    <div class="stat-value text-secondary" id="word-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Lines</div>
                                    <div class="stat-value text-accent" id="line-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Paragraphs</div>
                                    <div class="stat-value text-info" id="paragraph-count">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    analyzeText(text) {
        // Character count
        const charCount = document.getElementById('char-count');
        if (charCount) charCount.textContent = text.length;

        // Word count
        const wordCount = document.getElementById('word-count');
        if (wordCount) {
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            wordCount.textContent = words.length;
        }

        // Line count
        const lineCount = document.getElementById('line-count');
        if (lineCount) {
            const lines = text.split('\n').length;
            lineCount.textContent = lines;
        }

        // Paragraph count
        const paragraphCount = document.getElementById('paragraph-count');
        if (paragraphCount) {
            const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0).length;
            paragraphCount.textContent = paragraphs;
        }
    }

    initialize() {
        // Analyze initial empty text
        this.analyzeText('');
    }
}

// Create global instance
const textCounterTool = new TextCounterTool();
window.textCounterTool = textCounterTool;
