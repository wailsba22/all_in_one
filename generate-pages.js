// Script to generate individual HTML pages for each tool
const fs = require('fs');
const path = require('path');

// Read CSS file content
const cssContent = fs.readFileSync(path.join(__dirname, 'assets', 'css', 'style.css'), 'utf8');

const toolsData = {
    image: [
        { id: 'jpg-to-png', name: 'JPG to PNG', icon: 'https://cdn-icons-png.flaticon.com/128/3767/3767084.png', description: 'Convert JPG images to PNG format' },
        { id: 'png-to-jpg', name: 'PNG to JPG', icon: 'https://cdn-icons-png.flaticon.com/128/3767/3767094.png', description: 'Convert PNG images to JPG format' },
        { id: 'webp-to-jpg', name: 'WEBP to JPG', icon: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png', description: 'Convert WEBP images to JPG format' },
        { id: 'webp-to-png', name: 'WEBP to PNG', icon: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png', description: 'Convert WEBP images to PNG format' },
        { id: 'jpg-to-webp', name: 'JPG to WEBP', icon: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png', description: 'Convert JPG images to WEBP format' },
        { id: 'png-to-webp', name: 'PNG to WEBP', icon: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png', description: 'Convert PNG images to WEBP format' },
        { id: 'heic-to-jpg', name: 'HEIC to JPG', icon: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png', description: 'Convert HEIC images to JPG format' },
        { id: 'image-resize', name: 'Image Resizer', icon: 'https://cdn-icons-png.flaticon.com/128/3603/3603047.png', description: 'Resize images to custom dimensions' },
        { id: 'image-compress', name: 'Image Compressor', icon: 'https://cdn-icons-png.flaticon.com/128/2721/2721666.png', description: 'Compress images to reduce file size' },
        { id: 'image-crop', name: 'Image Cropper', icon: 'https://cdn-icons-png.flaticon.com/128/2721/2721715.png', description: 'Crop images to desired size' },
        { id: 'image-rotate', name: 'Image Rotator', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png', description: 'Rotate images by any angle' },
        { id: 'image-flip', name: 'Image Flipper', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png', description: 'Flip images horizontally or vertically' }
    ],
    text: [
        { id: 'text-to-speech', name: 'Text to Speech', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524636.png', description: 'Convert text to audio (uses browser TTS)' },
        { id: 'case-converter', name: 'Case Converter', icon: 'https://cdn-icons-png.flaticon.com/128/2721/2721791.png', description: 'Convert text case (upper, lower, title)' },
        { id: 'word-counter', name: 'Word Counter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179068.png', description: 'Count words, characters, and lines' },
        { id: 'text-reverser', name: 'Text Reverser', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Reverse text or words' },
        { id: 'lorem-generator', name: 'Lorem Ipsum Generator', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Generate placeholder text' },
        { id: 'markdown-preview', name: 'Markdown Preview', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Preview Markdown as HTML' },
        { id: 'html-entities', name: 'HTML Entities Encoder', icon: 'https://cdn-icons-png.flaticon.com/128/1051/1051277.png', description: 'Encode/decode HTML entities' },
        { id: 'text-diff', name: 'Text Diff Checker', icon: 'https://cdn-icons-png.flaticon.com/128/4185/4185287.png', description: 'Compare two texts and show differences' },
        { id: 'remove-duplicates', name: 'Remove Duplicates', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Remove duplicate lines from text' },
        { id: 'sort-lines', name: 'Sort Lines', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Sort text lines alphabetically' }
    ],
    dev: [
        { id: 'base64-encode', name: 'Base64 Encoder', icon: 'https://cdn-icons-png.flaticon.com/128/1304/1304061.png', description: 'Encode text to Base64' },
        { id: 'base64-decode', name: 'Base64 Decoder', icon: 'https://cdn-icons-png.flaticon.com/128/1304/1304046.png', description: 'Decode Base64 to text' },
        { id: 'url-encode', name: 'URL Encoder', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524335.png', description: 'Encode text for URLs' },
        { id: 'url-decode', name: 'URL Decoder', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524344.png', description: 'Decode URL encoded text' },
        { id: 'json-formatter', name: 'JSON Formatter', icon: 'https://cdn-icons-png.flaticon.com/128/136/136525.png', description: 'Format and beautify JSON' },
        { id: 'json-minify', name: 'JSON Minifier', icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png', description: 'Minify JSON to reduce size' },
        { id: 'json-to-csv', name: 'JSON to CSV', icon: 'https://cdn-icons-png.flaticon.com/128/6133/6133884.png', description: 'Convert JSON to CSV format' },
        { id: 'csv-to-json', name: 'CSV to JSON', icon: 'https://cdn-icons-png.flaticon.com/128/6133/6133884.png', description: 'Convert CSV to JSON format' },
        { id: 'xml-formatter', name: 'XML Formatter', icon: 'https://cdn-icons-png.flaticon.com/128/136/136526.png', description: 'Format and beautify XML' },
        { id: 'hash-generator', name: 'Hash Generator', icon: 'https://cdn-icons-png.flaticon.com/128/4185/4185082.png', description: 'Generate MD5, SHA1, SHA256 hashes' },
        { id: 'uuid-generator', name: 'UUID Generator', icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920354.png', description: 'Generate UUIDs (v4)' },
        { id: 'jwt-decoder', name: 'JWT Decoder', icon: 'https://cdn-icons-png.flaticon.com/128/2620/2620288.png', description: 'Decode JWT tokens' },
        { id: 'color-converter', name: 'Color Converter', icon: 'https://cdn-icons-png.flaticon.com/128/2972/2972531.png', description: 'Convert HEX, RGB, HSL colors' },
        { id: 'unix-timestamp', name: 'Unix Timestamp', icon: 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png', description: 'Convert Unix timestamp to date' },
        { id: 'regex-tester', name: 'Regex Tester', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png', description: 'Test regular expressions' },
        { id: 'css-minify', name: 'CSS Minifier', icon: 'https://cdn-icons-png.flaticon.com/128/732/732190.png', description: 'Minify CSS code' },
        { id: 'js-minify', name: 'JavaScript Minifier', icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968292.png', description: 'Minify JavaScript code' }
    ],
    units: [
        { id: 'length-converter', name: 'Length Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179231.png', description: 'Convert length units (m, ft, in, cm)' },
        { id: 'weight-converter', name: 'Weight Converter', icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920230.png', description: 'Convert weight units (kg, lb, oz, g)' },
        { id: 'temperature-converter', name: 'Temperature Converter', icon: 'https://cdn-icons-png.flaticon.com/128/1684/1684350.png', description: 'Convert °C, °F, K' },
        { id: 'area-converter', name: 'Area Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179234.png', description: 'Convert area units (m², ft², acre)' },
        { id: 'volume-converter', name: 'Volume Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3050/3050155.png', description: 'Convert volume units (L, gal, ml)' },
        { id: 'speed-converter', name: 'Speed Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179073.png', description: 'Convert speed units (km/h, mph, m/s)' },
        { id: 'time-converter', name: 'Time Converter', icon: 'https://cdn-icons-png.flaticon.com/128/2972/2972528.png', description: 'Convert time units (s, min, h, d)' },
        { id: 'data-size-converter', name: 'Data Size Converter', icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png', description: 'Convert bytes, KB, MB, GB, TB' },
        { id: 'pressure-converter', name: 'Pressure Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png', description: 'Convert pressure units (Pa, bar, psi)' },
        { id: 'energy-converter', name: 'Energy Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png', description: 'Convert energy units (J, cal, kWh)' }
    ],
    utilities: [
        { id: 'qr-generator', name: 'QR Code Generator', icon: 'https://cdn-icons-png.flaticon.com/128/714/714361.png', description: 'Create QR codes from text/URL' },
        { id: 'password-generator', name: 'Password Generator', icon: 'https://cdn-icons-png.flaticon.com/128/2889/2889676.png', description: 'Generate secure passwords' },
        { id: 'random-number', name: 'Random Number Generator', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png', description: 'Generate random numbers' },
        { id: 'color-picker', name: 'Color Picker', icon: 'https://cdn-icons-png.flaticon.com/128/2972/2972531.png', description: 'Pick colors and get color codes' },
        { id: 'gradient-generator', name: 'CSS Gradient Generator', icon: 'https://cdn-icons-png.flaticon.com/128/3524/3524636.png', description: 'Create CSS gradients visually' },
        { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', icon: 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png', description: 'Generate placeholder text' },
        { id: 'countdown-timer', name: 'Countdown Timer', icon: 'https://cdn-icons-png.flaticon.com/128/2972/2972528.png', description: 'Create countdown timers' },
        { id: 'stopwatch', name: 'Stopwatch', icon: 'https://cdn-icons-png.flaticon.com/128/2972/2972528.png', description: 'Simple stopwatch tool' },
        { id: 'timezone-converter', name: 'Timezone Converter', icon: 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png', description: 'Convert times between timezones' },
        { id: 'percentage-calculator', name: 'Percentage Calculator', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png', description: 'Calculate percentages' },
        { id: 'bmi-calculator', name: 'BMI Calculator', icon: 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png', description: 'Calculate Body Mass Index' },
        { id: 'age-calculator', name: 'Age Calculator', icon: 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png', description: 'Calculate age from birth date' }
    ]
};

const template = (tool) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.name} - Free Online Tool | ConvertHub</title>
    <meta name="description" content="${tool.description}. Fast, free, and secure - all conversions happen in your browser.">
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
${cssContent}
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <a href="../index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
                    <i class="fas fa-sync-alt"></i>
                    <span>ConvertHub</span>
                </a>
            </div>
            <nav class="nav">
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">
                        Image Tools <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-menu-content">
                            <h4>Image Converters</h4>
                            <div class="dropdown-grid" id="nav-image-tools"></div>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">
                        Text Tools <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-menu-content">
                            <h4>Text & Encoding</h4>
                            <div class="dropdown-grid" id="nav-text-tools"></div>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">
                        Developer Tools <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-menu-content">
                            <h4>Code & Development</h4>
                            <div class="dropdown-grid" id="nav-dev-tools"></div>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">
                        Unit Converters <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-menu-content">
                            <h4>Measurement Converters</h4>
                            <div class="dropdown-grid" id="nav-unit-tools"></div>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">
                        All Tools <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-menu-content">
                            <h4>Utility Tools</h4>
                            <div class="dropdown-grid" id="nav-utility-tools"></div>
                        </div>
                    </div>
                </div>
            </nav>
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <!-- Tool Page Content -->
    <main class="tool-page">
        <div class="container">
            <div class="tool-header">
                <div class="tool-icon">
                    <img src="${tool.icon}" alt="${tool.name}">
                </div>
                <div class="tool-info">
                    <h1>${tool.name}</h1>
                    <p>${tool.description}. 100% free and secure - all processing happens in your browser.</p>
                </div>
            </div>

            <div class="tool-converter" id="converterArea">
                <!-- Converter interface will be loaded here -->
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ConvertHub. All rights reserved. | <a href="../index.html">Home</a></p>
        </div>
    </footer>

    <script src="../assets/js/tools-data.js"></script>
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/converters.js"></script>
    <script src="../assets/js/converters-part2.js"></script>
    <script src="../assets/js/converters-part3.js"></script>
    <script>
        // Load the specific tool
        document.addEventListener('DOMContentLoaded', () => {
            const tool = ${JSON.stringify(tool)};
            const converterArea = document.getElementById('converterArea');
            converterArea.innerHTML = getConverterHTML(tool);
            initializeConverter(tool);
            
            // Load navigation dropdowns
            renderNavDropdowns();
        });
    </script>
</body>
</html>`;

// Create tools directory if it doesn't exist
const toolsDir = path.join(__dirname, 'tools');
if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir);
}

// Generate HTML files for all tools
let count = 0;
Object.values(toolsData).forEach(category => {
    category.forEach(tool => {
        const html = template(tool);
        const filename = path.join(toolsDir, `${tool.id}.html`);
        fs.writeFileSync(filename, html);
        count++;
        console.log(`Created: ${tool.id}.html`);
    });
});

console.log(`\nGenerated ${count} tool pages successfully!`);
