// Complete Tool Configurations for All 60 Tools
// This file contains all tool definitions with their UI and logic

module.exports = {
    // Calculators
    'age-calculator': require('./tool-configs/age-calculator'),
    'bmi-calculator': require('./tool-configs/bmi-calculator'),
    'percentage-calculator': require('./tool-configs/percentage-calculator'),
    
    // Encoders/Decoders
    'base64-encode': require('./tool-configs/base64-encode'),
    'base64-decode': require('./tool-configs/base64-decode'),
    'url-encode': require('./tool-configs/url-encode'),
    'url-decode': require('./tool-configs/url-decode'),
    'html-entities': require('./tool-configs/html-entities'),
    
    // Text Tools
    'case-converter': require('./tool-configs/case-converter'),
    'word-counter': require('./tool-configs/word-counter'),
    'text-reverser': require('./tool-configs/text-reverser'),
    'text-diff': require('./tool-configs/text-diff'),
    'remove-duplicates': require('./tool-configs/remove-duplicates'),
    'sort-lines': require('./tool-configs/sort-lines'),
    'lorem-generator': require('./tool-configs/lorem-generator'),
    'lorem-ipsum': require('./tool-configs/lorem-ipsum'),
    'markdown-preview': require('./tool-configs/markdown-preview'),
    'text-to-speech': require('./tool-configs/text-to-speech'),
    
    // Code/Dev Tools
    'json-formatter': require('./tool-configs/json-formatter'),
    'json-minify': require('./tool-configs/json-minify'),
    'json-to-csv': require('./tool-configs/json-to-csv'),
    'csv-to-json': require('./tool-configs/csv-to-json'),
    'xml-formatter': require('./tool-configs/xml-formatter'),
    'css-minify': require('./tool-configs/css-minify'),
    'js-minify': require('./tool-configs/js-minify'),
    'regex-tester': require('./tool-configs/regex-tester'),
    'jwt-decoder': require('./tool-configs/jwt-decoder'),
    
    // Generators
    'password-generator': require('./tool-configs/password-generator'),
    'hash-generator': require('./tool-configs/hash-generator'),
    'uuid-generator': require('./tool-configs/uuid-generator'),
    'qr-generator': require('./tool-configs/qr-generator'),
    'gradient-generator': require('./tool-configs/gradient-generator'),
    'random-number': require('./tool-configs/random-number'),
    
    // Time/Date Tools
    'unix-timestamp': require('./tool-configs/unix-timestamp'),
    'timezone-converter': require('./tool-configs/timezone-converter'),
    'countdown-timer': require('./tool-configs/countdown-timer'),
    'stopwatch': require('./tool-configs/stopwatch'),
    
    // Unit Converters
    'length-converter': require('./tool-configs/length-converter'),
    'weight-converter': require('./tool-configs/weight-converter'),
    'temperature-converter': require('./tool-configs/temperature-converter'),
    'area-converter': require('./tool-configs/area-converter'),
    'volume-converter': require('./tool-configs/volume-converter'),
    'speed-converter': require('./tool-configs/speed-converter'),
    'time-converter': require('./tool-configs/time-converter'),
    'pressure-converter': require('./tool-configs/pressure-converter'),
    'energy-converter': require('./tool-configs/energy-converter'),
    'data-size-converter': require('./tool-configs/data-size-converter'),
    
    // Color Tools
    'color-converter': require('./tool-configs/color-converter'),
    'color-picker': require('./tool-configs/color-picker'),
    
    // Image Converters
    'jpg-to-png': require('./tool-configs/jpg-to-png'),
    'png-to-jpg': require('./tool-configs/png-to-jpg'),
    'jpg-to-webp': require('./tool-configs/jpg-to-webp'),
    'webp-to-jpg': require('./tool-configs/webp-to-jpg'),
    'png-to-webp': require('./tool-configs/png-to-webp'),
    'webp-to-png': require('./tool-configs/webp-to-png'),
    'heic-to-jpg': require('./tool-configs/heic-to-jpg'),
    
    // Image Tools
    'image-resize': require('./tool-configs/image-resize'),
    'image-compress': require('./tool-configs/image-compress'),
    'image-crop': require('./tool-configs/image-crop'),
    'image-rotate': require('./tool-configs/image-rotate'),
    'image-flip': require('./tool-configs/image-flip'),
};
