// All available tools categorized
const toolsData = {
    popular: [
        { id: 'jpg-to-png', name: 'JPG to PNG', icon: 'fa-image', description: 'Convert JPG images to PNG format', category: 'image' },
        { id: 'png-to-jpg', name: 'PNG to JPG', icon: 'fa-image', description: 'Convert PNG images to JPG format', category: 'image' },
        { id: 'base64-encode', name: 'Base64 Encoder', icon: 'fa-code', description: 'Encode text to Base64', category: 'dev' },
        { id: 'base64-decode', name: 'Base64 Decoder', icon: 'fa-code', description: 'Decode Base64 to text', category: 'dev' },
        { id: 'json-formatter', name: 'JSON Formatter', icon: 'fa-brackets-curly', description: 'Format and beautify JSON', category: 'dev' },
        { id: 'qr-generator', name: 'QR Code Generator', icon: 'fa-qrcode', description: 'Create QR codes from text/URL', category: 'utility' },
        { id: 'password-generator', name: 'Password Generator', icon: 'fa-key', description: 'Generate secure passwords', category: 'utility' },
        { id: 'hash-generator', name: 'Hash Generator', icon: 'fa-hashtag', description: 'Generate MD5, SHA1, SHA256 hashes', category: 'dev' }
    ],
    
    image: [
        { id: 'jpg-to-png', name: 'JPG to PNG', icon: 'fa-image', description: 'Convert JPG images to PNG format' },
        { id: 'png-to-jpg', name: 'PNG to JPG', icon: 'fa-image', description: 'Convert PNG images to JPG format' },
        { id: 'webp-to-jpg', name: 'WEBP to JPG', icon: 'fa-image', description: 'Convert WEBP images to JPG format' },
        { id: 'webp-to-png', name: 'WEBP to PNG', icon: 'fa-image', description: 'Convert WEBP images to PNG format' },
        { id: 'jpg-to-webp', name: 'JPG to WEBP', icon: 'fa-image', description: 'Convert JPG images to WEBP format' },
        { id: 'png-to-webp', name: 'PNG to WEBP', icon: 'fa-image', description: 'Convert PNG images to WEBP format' },
        { id: 'heic-to-jpg', name: 'HEIC to JPG', icon: 'fa-image', description: 'Convert HEIC images to JPG format' },
        { id: 'image-resize', name: 'Image Resizer', icon: 'fa-expand-arrows-alt', description: 'Resize images to custom dimensions' },
        { id: 'image-compress', name: 'Image Compressor', icon: 'fa-compress', description: 'Compress images to reduce file size' },
        { id: 'image-crop', name: 'Image Cropper', icon: 'fa-crop', description: 'Crop images to desired size' },
        { id: 'image-rotate', name: 'Image Rotator', icon: 'fa-rotate', description: 'Rotate images by any angle' },
        { id: 'image-flip', name: 'Image Flipper', icon: 'fa-arrows-alt-h', description: 'Flip images horizontally or vertically' }
    ],
    
    text: [
        { id: 'text-to-speech', name: 'Text to Speech', icon: 'fa-volume-up', description: 'Convert text to audio (uses browser TTS)' },
        { id: 'case-converter', name: 'Case Converter', icon: 'fa-text-height', description: 'Convert text case (upper, lower, title)' },
        { id: 'word-counter', name: 'Word Counter', icon: 'fa-calculator', description: 'Count words, characters, and lines' },
        { id: 'text-reverser', name: 'Text Reverser', icon: 'fa-exchange-alt', description: 'Reverse text or words' },
        { id: 'lorem-generator', name: 'Lorem Ipsum Generator', icon: 'fa-paragraph', description: 'Generate placeholder text' },
        { id: 'markdown-preview', name: 'Markdown Preview', icon: 'fa-markdown', description: 'Preview Markdown as HTML' },
        { id: 'html-entities', name: 'HTML Entities Encoder', icon: 'fa-code', description: 'Encode/decode HTML entities' },
        { id: 'text-diff', name: 'Text Diff Checker', icon: 'fa-not-equal', description: 'Compare two texts and show differences' },
        { id: 'remove-duplicates', name: 'Remove Duplicates', icon: 'fa-filter', description: 'Remove duplicate lines from text' },
        { id: 'sort-lines', name: 'Sort Lines', icon: 'fa-sort-alpha-down', description: 'Sort text lines alphabetically' }
    ],
    
    dev: [
        { id: 'base64-encode', name: 'Base64 Encoder', icon: 'fa-code', description: 'Encode text to Base64' },
        { id: 'base64-decode', name: 'Base64 Decoder', icon: 'fa-code', description: 'Decode Base64 to text' },
        { id: 'url-encode', name: 'URL Encoder', icon: 'fa-link', description: 'Encode text for URLs' },
        { id: 'url-decode', name: 'URL Decoder', icon: 'fa-link', description: 'Decode URL encoded text' },
        { id: 'json-formatter', name: 'JSON Formatter', icon: 'fa-brackets-curly', description: 'Format and beautify JSON' },
        { id: 'json-minify', name: 'JSON Minifier', icon: 'fa-compress', description: 'Minify JSON to reduce size' },
        { id: 'json-to-csv', name: 'JSON to CSV', icon: 'fa-table', description: 'Convert JSON to CSV format' },
        { id: 'csv-to-json', name: 'CSV to JSON', icon: 'fa-brackets-curly', description: 'Convert CSV to JSON format' },
        { id: 'xml-formatter', name: 'XML Formatter', icon: 'fa-code', description: 'Format and beautify XML' },
        { id: 'hash-generator', name: 'Hash Generator', icon: 'fa-hashtag', description: 'Generate MD5, SHA1, SHA256 hashes' },
        { id: 'uuid-generator', name: 'UUID Generator', icon: 'fa-fingerprint', description: 'Generate UUIDs (v4)' },
        { id: 'jwt-decoder', name: 'JWT Decoder', icon: 'fa-key', description: 'Decode JWT tokens' },
        { id: 'color-converter', name: 'Color Converter', icon: 'fa-palette', description: 'Convert HEX, RGB, HSL colors' },
        { id: 'unix-timestamp', name: 'Unix Timestamp', icon: 'fa-clock', description: 'Convert Unix timestamp to date' },
        { id: 'regex-tester', name: 'Regex Tester', icon: 'fa-search', description: 'Test regular expressions' },
        { id: 'css-minify', name: 'CSS Minifier', icon: 'fa-compress', description: 'Minify CSS code' },
        { id: 'js-minify', name: 'JavaScript Minifier', icon: 'fa-compress', description: 'Minify JavaScript code' }
    ],
    
    units: [
        { id: 'length-converter', name: 'Length Converter', icon: 'fa-ruler', description: 'Convert length units (m, ft, in, cm)' },
        { id: 'weight-converter', name: 'Weight Converter', icon: 'fa-weight', description: 'Convert weight units (kg, lb, oz, g)' },
        { id: 'temperature-converter', name: 'Temperature Converter', icon: 'fa-temperature-high', description: 'Convert °C, °F, K' },
        { id: 'area-converter', name: 'Area Converter', icon: 'fa-square', description: 'Convert area units (m², ft², acre)' },
        { id: 'volume-converter', name: 'Volume Converter', icon: 'fa-cube', description: 'Convert volume units (L, gal, ml)' },
        { id: 'speed-converter', name: 'Speed Converter', icon: 'fa-tachometer-alt', description: 'Convert speed units (km/h, mph, m/s)' },
        { id: 'time-converter', name: 'Time Converter', icon: 'fa-clock', description: 'Convert time units (s, min, h, d)' },
        { id: 'data-size-converter', name: 'Data Size Converter', icon: 'fa-hdd', description: 'Convert bytes, KB, MB, GB, TB' },
        { id: 'pressure-converter', name: 'Pressure Converter', icon: 'fa-gauge', description: 'Convert pressure units (Pa, bar, psi)' },
        { id: 'energy-converter', name: 'Energy Converter', icon: 'fa-bolt', description: 'Convert energy units (J, cal, kWh)' }
    ],
    
    utilities: [
        { id: 'qr-generator', name: 'QR Code Generator', icon: 'fa-qrcode', description: 'Create QR codes from text/URL' },
        { id: 'password-generator', name: 'Password Generator', icon: 'fa-key', description: 'Generate secure passwords' },
        { id: 'random-number', name: 'Random Number Generator', icon: 'fa-dice', description: 'Generate random numbers' },
        { id: 'color-picker', name: 'Color Picker', icon: 'fa-palette', description: 'Pick colors and get color codes' },
        { id: 'gradient-generator', name: 'CSS Gradient Generator', icon: 'fa-fill-drip', description: 'Create CSS gradients visually' },
        { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', icon: 'fa-paragraph', description: 'Generate placeholder text' },
        { id: 'countdown-timer', name: 'Countdown Timer', icon: 'fa-stopwatch', description: 'Create countdown timers' },
        { id: 'stopwatch', name: 'Stopwatch', icon: 'fa-clock', description: 'Simple stopwatch tool' },
        { id: 'timezone-converter', name: 'Timezone Converter', icon: 'fa-globe', description: 'Convert times between timezones' },
        { id: 'percentage-calculator', name: 'Percentage Calculator', icon: 'fa-percent', description: 'Calculate percentages' },
        { id: 'bmi-calculator', name: 'BMI Calculator', icon: 'fa-heartbeat', description: 'Calculate Body Mass Index' },
        { id: 'age-calculator', name: 'Age Calculator', icon: 'fa-birthday-cake', description: 'Calculate age from birth date' }
    ],

    document: [
        { id: 'pdf-merger', name: 'PDF Merger', icon: 'fa-file-pdf', description: 'Combine multiple PDF files into one' },
        { id: 'pdf-splitter', name: 'PDF Splitter', icon: 'fa-scissors', description: 'Split PDF into separate pages' },
        { id: 'pdf-compressor', name: 'PDF Compressor', icon: 'fa-compress', description: 'Reduce PDF file size' },
        { id: 'word-to-pdf', name: 'Word to PDF', icon: 'fa-file-word', description: 'Convert Word documents to PDF' },
        { id: 'excel-to-pdf', name: 'Excel to PDF', icon: 'fa-file-excel', description: 'Convert Excel spreadsheets to PDF' },
        { id: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', icon: 'fa-file-powerpoint', description: 'Convert presentations to PDF' },
        { id: 'excel-to-csv', name: 'Excel to CSV', icon: 'fa-table', description: 'Convert Excel to CSV format' },
        { id: 'word-counter-doc', name: 'Document Word Counter', icon: 'fa-file-alt', description: 'Count words in documents' }
    ]
};
