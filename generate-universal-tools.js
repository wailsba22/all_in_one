const fs = require('fs');
const path = require('path');

// Tool configurations with their specific logic
const toolConfigs = {
    'age-calculator': {
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, days, and more',
        inputs: [
            { id: 'day', label: 'Day', type: 'number', min: '1', max: '31', placeholder: 'DD' },
            { id: 'month', label: 'Month', type: 'number', min: '1', max: '12', placeholder: 'MM' },
            { id: 'year', label: 'Year', type: 'number', min: '1900', max: '2025', placeholder: 'YYYY' }
        ],
        buttons: [
            { text: '🎂 Calculate My Age', action: 'calculateAge()', primary: true }
        ],
        outputType: 'custom',
        script: `
// Set current year as max
const currentYear = new Date().getFullYear();
document.getElementById('year').max = currentYear;

function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const output = document.getElementById('output');
    
    if (!day || !month || !year) {
        UniversalToast.error('Please enter day, month, and year');
        return;
    }
    
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
        UniversalToast.error('Please enter valid date values');
        return;
    }
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    if (birthDate > today) {
        UniversalToast.error('Birth date cannot be in the future');
        return;
    }
    
    if (isNaN(birthDate.getTime())) {
        UniversalToast.error('Invalid date');
        return;
    }
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    output.innerHTML = \`
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white; text-align: center; margin-bottom: 1.5rem;">
            <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;">\${years}</div>
            <div style="font-size: 1.125rem; opacity: 0.95;">Years Old</div>
            <div style="margin-top: 0.75rem; font-size: 0.95rem; opacity: 0.9;">\${years} years, \${months} months, and \${days} days</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.875rem;">
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
                <div style="font-size: 1.75rem; font-weight: 700; color: #667eea; margin-bottom: 0.25rem;">\${totalMonths}</div>
                <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Months</div>
            </div>
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
                <div style="font-size: 1.75rem; font-weight: 700; color: #667eea; margin-bottom: 0.25rem;">\${totalWeeks.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Weeks</div>
            </div>
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
                <div style="font-size: 1.75rem; font-weight: 700; color: #667eea; margin-bottom: 0.25rem;">\${totalDays.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Days</div>
            </div>
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
                <div style="font-size: 1.75rem; font-weight: 700; color: #667eea; margin-bottom: 0.25rem;">\${totalHours.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Hours</div>
            </div>
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
                <div style="font-size: 1.75rem; font-weight: 700; color: #667eea; margin-bottom: 0.25rem;">\${totalMinutes.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Minutes</div>
            </div>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%); border-radius: 10px; text-align: center; border: 1px solid #fbbf24;">
            <div style="font-size: 0.875rem; color: #92400e; font-weight: 500;">🎉 Next Birthday</div>
            <div style="font-size: 1.125rem; color: #78350f; font-weight: 600; margin-top: 0.25rem;">In \${daysToNextBirthday} days</div>
        </div>
    \`;
    UniversalToast.success('Age calculated successfully!');
}
`
    },
    
    'bmi-calculator': {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and health category',
        inputs: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: '170' }
        ],
        buttons: [
            { text: 'Calculate BMI', action: 'calculateBMI()', primary: true }
        ],
        outputType: 'custom',
        script: `
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const output = document.getElementById('output');
    
    if (!weight || !height) {
        UniversalToast.error('Please enter both weight and height');
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3b82f6';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = '#10b981';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f59e0b';
    } else {
        category = 'Obese';
        color = '#ef4444';
    }
    
    output.innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 4rem; font-weight: 800; color: \${color};">\${bmi}</div>
            <div style="font-size: 1.5rem; font-weight: 600; color: var(--text-secondary); margin-top: 0.5rem;">\${category}</div>
            <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-gray); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Underweight</span><span>&lt; 18.5</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Normal</span><span>18.5 - 24.9</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Overweight</span><span>25 - 29.9</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Obese</span><span>≥ 30</span>
                </div>
            </div>
        </div>
    \`;
}
`
    },
    
    'base64-encode': {
        title: 'Base64 Encoder',
        description: 'Encode text to Base64 format',
        textareaInput: { id: 'input', label: 'Text to Encode', placeholder: 'Enter text to encode...' },
        buttons: [
            { text: 'Encode', action: 'encode()', primary: true },
            { text: 'Copy Result', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Base64 Output', readonly: true },
        script: `
function encode() {
    const text = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    if (!text) {
        output.value = '';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        output.value = encoded;
    } catch (e) {
        UniversalToast.error('Failed to encode text');
    }
}

document.getElementById('input').addEventListener('input', encode);
`
    },
    
    'base64-decode': {
        title: 'Base64 Decoder',
        description: 'Decode Base64 to text format',
        textareaInput: { id: 'input', label: 'Base64 to Decode', placeholder: 'Enter Base64 string...' },
        buttons: [
            { text: 'Decode', action: 'decode()', primary: true },
            { text: 'Copy Result', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Decoded Text', readonly: true },
        script: `
function decode() {
    const text = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    if (!text) {
        output.value = '';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(text)));
        output.value = decoded;
    } catch (e) {
        UniversalToast.error('Invalid Base64 string');
    }
}

document.getElementById('input').addEventListener('input', decode);
`
    },
    
    'password-generator': {
        title: 'Password Generator',
        description: 'Generate secure random passwords',
        inputs: [
            { id: 'length', label: 'Password Length', type: 'number', value: '16', min: '4', max: '128' }
        ],
        checkboxes: [
            { id: 'uppercase', label: 'Uppercase Letters (A-Z)', checked: true },
            { id: 'lowercase', label: 'Lowercase Letters (a-z)', checked: true },
            { id: 'numbers', label: 'Numbers (0-9)', checked: true },
            { id: 'symbols', label: 'Symbols (!@#$%...)', checked: true }
        ],
        buttons: [
            { text: 'Generate Password', action: 'generatePassword()', primary: true },
            { text: 'Copy Password', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Generated Password', readonly: true },
        script: `
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;
    
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        UniversalToast.error('Please select at least one character type');
        return;
    }
    
    let chars = '';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('output').value = password;
}

// Generate on load
generatePassword();
`
    },
    
    'url-encode': {
        title: 'URL Encoder',
        description: 'Encode text for safe URL usage',
        textareaInput: { id: 'input', label: 'Text to Encode', placeholder: 'Enter text to URL encode...' },
        buttons: [
            { text: 'Encode', action: 'encode()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'URL Encoded', readonly: true },
        script: `
function encode() {
    const text = document.getElementById('input').value;
    document.getElementById('output').value = encodeURIComponent(text);
}
document.getElementById('input').addEventListener('input', encode);
`
    },
    
    'url-decode': {
        title: 'URL Decoder',
        description: 'Decode URL encoded text',
        textareaInput: { id: 'input', label: 'URL to Decode', placeholder: 'Enter URL encoded text...' },
        buttons: [
            { text: 'Decode', action: 'decode()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Decoded Text', readonly: true },
        script: `
function decode() {
    try {
        const text = document.getElementById('input').value;
        document.getElementById('output').value = decodeURIComponent(text);
    } catch(e) {
        UniversalToast.error('Invalid URL encoding');
    }
}
document.getElementById('input').addEventListener('input', decode);
`
    },
    
    'case-converter': {
        title: 'Case Converter',
        description: 'Convert text between different cases',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter text...' },
        buttons: [
            { text: 'UPPER', action: 'convert("upper")', secondary: true },
            { text: 'lower', action: 'convert("lower")', secondary: true },
            { text: 'Title', action: 'convert("title")', secondary: true },
            { text: 'Sentence', action: 'convert("sentence")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Converted Text', readonly: true },
        script: `
function convert(type) {
    let text = document.getElementById('input').value;
    if (type === 'upper') text = text.toUpperCase();
    else if (type === 'lower') text = text.toLowerCase();
    else if (type === 'title') text = text.toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase());
    else if (type === 'sentence') text = text.toLowerCase().replace(/(^\\s*\\w|[.!?]\\s*\\w)/g, l => l.toUpperCase());
    document.getElementById('output').value = text;
}
`
    },
    
    'word-counter': {
        title: 'Word Counter',
        description: 'Count words, characters, sentences, and paragraphs',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Type or paste text...' },
        outputType: 'custom',
        script: `
function countStats() {
    const text = document.getElementById('input').value;
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\\n+/).filter(p => p.trim()).length;
    
    document.getElementById('output').innerHTML = \`
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
            <div class="stat-item">
                <span class="stat-label">Words</span>
                <span class="stat-value">\${words}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Characters</span>
                <span class="stat-value">\${chars}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">No Spaces</span>
                <span class="stat-value">\${charsNoSpace}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Sentences</span>
                <span class="stat-value">\${sentences}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Paragraphs</span>
                <span class="stat-value">\${paragraphs}</span>
            </div>
        </div>
    \`;
}
document.getElementById('input').addEventListener('input', countStats);
countStats();
`
    },
    
    'text-reverser': {
        title: 'Text Reverser',
        description: 'Reverse text or words order',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter text to reverse...' },
        buttons: [
            { text: 'Reverse Text', action: 'reverseText()', primary: true },
            { text: 'Reverse Words', action: 'reverseWords()', secondary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Reversed Text', readonly: true },
        script: `
function reverseText() {
    const text = document.getElementById('input').value;
    document.getElementById('output').value = text.split('').reverse().join('');
}
function reverseWords() {
    const text = document.getElementById('input').value;
    document.getElementById('output').value = text.split(' ').reverse().join(' ');
}
`
    },
    
    'json-formatter': {
        title: 'JSON Formatter',
        description: 'Format and beautify JSON',
        textareaInput: { id: 'input', label: 'JSON Input', placeholder: '{"key":"value"}' },
        buttons: [
            { text: 'Format', action: 'formatJSON()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Formatted JSON', readonly: true },
        script: `
function formatJSON() {
    try {
        const text = document.getElementById('input').value;
        const obj = JSON.parse(text);
        document.getElementById('output').value = JSON.stringify(obj, null, 2);
    } catch(e) {
        UniversalToast.error('Invalid JSON: ' + e.message);
    }
}
`
    },
    
    'json-minify': {
        title: 'JSON Minifier',
        description: 'Minify JSON to reduce size',
        textareaInput: { id: 'input', label: 'JSON Input', placeholder: 'Enter JSON...' },
        buttons: [
            { text: 'Minify', action: 'minifyJSON()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Minified JSON', readonly: true },
        script: `
function minifyJSON() {
    try {
        const text = document.getElementById('input').value;
        const obj = JSON.parse(text);
        document.getElementById('output').value = JSON.stringify(obj);
    } catch(e) {
        UniversalToast.error('Invalid JSON');
    }
}
`
    },
    
    'uuid-generator': {
        title: 'UUID Generator',
        description: 'Generate random UUID/GUID',
        buttons: [
            { text: 'Generate UUID', action: 'generateUUID()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Generated UUID', readonly: true },
        script: `
function generateUUID() {
    document.getElementById('output').value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
generateUUID();
`
    },
    
    'hash-generator': {
        title: 'Hash Generator',
        description: 'Generate MD5, SHA-1, SHA-256 hashes',
        textareaInput: { id: 'input', label: 'Text to Hash', placeholder: 'Enter text...' },
        buttons: [
            { text: 'Generate Hashes', action: 'generateHashes()', primary: true }
        ],
        outputType: 'custom',
        script: `
async function generateHashes() {
    const text = document.getElementById('input').value;
    if (!text) return;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    const sha256 = await crypto.subtle.digest('SHA-256', data);
    const sha1 = await crypto.subtle.digest('SHA-1', data);
    
    const hex = arr => Array.from(new Uint8Array(arr)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    document.getElementById('output').innerHTML = \`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div>
                <strong style="color: var(--text-secondary); font-size: 0.85rem;">SHA-256:</strong>
                <div style="font-family: monospace; word-break: break-all; padding: 0.5rem; background: var(--bg-gray); border-radius: 6px; margin-top: 0.25rem;">
                    \${hex(sha256)}
                </div>
            </div>
            <div>
                <strong style="color: var(--text-secondary); font-size: 0.85rem;">SHA-1:</strong>
                <div style="font-family: monospace; word-break: break-all; padding: 0.5rem; background: var(--bg-gray); border-radius: 6px; margin-top: 0.25rem;">
                    \${hex(sha1)}
                </div>
            </div>
        </div>
    \`;
}
`
    },
    
    'temperature-converter': {
        title: 'Temperature Converter',
        description: 'Convert between Celsius, Fahrenheit, and Kelvin',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '0', placeholder: '0' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertTemp()', primary: true }],
        outputType: 'custom',
        script: `
const units = ['Celsius', 'Fahrenheit', 'Kelvin'];
document.getElementById('from').innerHTML = units.map(u => \`<option value="\${u}">\${u}</option>\`).join('');
document.getElementById('to').innerHTML = units.map(u => \`<option value="\${u}">\${u}</option>\`).join('');
document.getElementById('to').value = 'Fahrenheit';

function convertTemp() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    
    let celsius = val;
    if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
    else if (from === 'Kelvin') celsius = val - 273.15;
    
    let result = celsius;
    if (to === 'Fahrenheit') result = celsius * 9/5 + 32;
    else if (to === 'Kelvin') result = celsius + 273.15;
    
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 700;">\${result.toFixed(2)}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${to}</div>
        </div>
    \`;
}
convertTemp();
`
    },
    
    'length-converter': {
        title: 'Length Converter',
        description: 'Convert between different length units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1', placeholder: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertLength()', primary: true }],
        outputType: 'custom',
        script: `
const units = {m: 'Meter', km: 'Kilometer', cm: 'Centimeter', mm: 'Millimeter', mi: 'Mile', yd: 'Yard', ft: 'Foot', in: 'Inch'};
const rates = {m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertLength() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertLength();
`
    },
    
    'weight-converter': {
        title: 'Weight Converter',
        description: 'Convert between different weight units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1', placeholder: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertWeight()', primary: true }],
        outputType: 'custom',
        script: `
const units = {kg: 'Kilogram', g: 'Gram', mg: 'Milligram', lb: 'Pound', oz: 'Ounce', t: 'Ton'};
const rates = {kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, t: 1000};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertWeight() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertWeight();
`
    },
    
    'percentage-calculator': {
        title: 'Percentage Calculator',
        description: 'Calculate percentages',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', placeholder: '100' },
            { id: 'percent', label: 'Percentage', type: 'number', placeholder: '20' }
        ],
        buttons: [{ text: 'Calculate', action: 'calculatePercent()', primary: true }],
        outputType: 'custom',
        script: `
function calculatePercent() {
    const val = parseFloat(document.getElementById('value').value);
    const pct = parseFloat(document.getElementById('percent').value);
    const result = (val * pct / 100).toFixed(2);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 3rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${pct}% of \${val}</div>
        </div>
    \`;
}
`
    },
    
    'random-number': {
        title: 'Random Number Generator',
        description: 'Generate random numbers',
        inputs: [
            { id: 'min', label: 'Minimum', type: 'number', value: '1' },
            { id: 'max', label: 'Maximum', type: 'number', value: '100' },
            { id: 'count', label: 'Count', type: 'number', value: '1' }
        ],
        buttons: [{ text: 'Generate', action: 'generateRandom()', primary: true }],
        outputType: 'custom',
        script: `
function generateRandom() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const count = parseInt(document.getElementById('count').value);
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center; font-size: 2rem; font-weight: 700;">
            \${numbers.join(', ')}
        </div>
    \`;
}
generateRandom();
`
    },
    
    'unix-timestamp': {
        title: 'Unix Timestamp Converter',
        description: 'Convert between date and Unix timestamp',
        inputs: [
            { id: 'timestamp', label: 'Unix Timestamp', type: 'number', value: Math.floor(Date.now()/1000) }
        ],
        buttons: [
            { text: 'To Date', action: 'toDate()', primary: true },
            { text: 'Current Time', action: 'setCurrent()', secondary: true }
        ],
        outputType: 'custom',
        script: `
function toDate() {
    const ts = parseInt(document.getElementById('timestamp').value);
    const date = new Date(ts * 1000);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 1.5rem; font-weight: 600;">\${date.toLocaleString()}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${date.toISOString()}</div>
        </div>
    \`;
}
function setCurrent() {
    document.getElementById('timestamp').value = Math.floor(Date.now() / 1000);
    toDate();
}
toDate();
`
    },
    
    'lorem-generator': {
        title: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text',
        inputs: [
            { id: 'count', label: 'Paragraphs', type: 'number', value: '3', min: '1', max: '20' }
        ],
        buttons: [
            { text: 'Generate', action: 'generateLorem()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Generated Text', readonly: true },
        script: `
function generateLorem() {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const count = parseInt(document.getElementById('count').value);
    const paragraphs = Array(count).fill(lorem).join('\\n\\n');
    document.getElementById('output').value = paragraphs;
}
generateLorem();
`
    },
    
    'area-converter': {
        title: 'Area Converter',
        description: 'Convert between area units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertArea()', primary: true }],
        outputType: 'custom',
        script: `
const units = {m2: 'Square Meter', km2: 'Square Kilometer', cm2: 'Square Centimeter', ha: 'Hectare', ac: 'Acre', ft2: 'Square Foot'};
const rates = {m2: 1, km2: 1000000, cm2: 0.0001, ha: 10000, ac: 4046.86, ft2: 0.092903};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertArea() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(6);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertArea();
`
    },
    
    'volume-converter': {
        title: 'Volume Converter',
        description: 'Convert between volume units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertVolume()', primary: true }],
        outputType: 'custom',
        script: `
const units = {l: 'Liter', ml: 'Milliliter', m3: 'Cubic Meter', gal: 'Gallon', qt: 'Quart', pt: 'Pint', cup: 'Cup'};
const rates = {l: 1, ml: 0.001, m3: 1000, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.24};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertVolume() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertVolume();
`
    },
    
    'speed-converter': {
        title: 'Speed Converter',
        description: 'Convert between speed units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '100' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertSpeed()', primary: true }],
        outputType: 'custom',
        script: `
const units = {mps: 'm/s', kph: 'km/h', mph: 'mph', fps: 'ft/s', knot: 'Knot'};
const rates = {mps: 1, kph: 0.277778, mph: 0.44704, fps: 0.3048, knot: 0.514444};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('from').value = 'kph';

function convertSpeed() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(2);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertSpeed();
`
    },
    
    'data-size-converter': {
        title: 'Data Size Converter',
        description: 'Convert between data size units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertData()', primary: true }],
        outputType: 'custom',
        script: `
const units = {B: 'Byte', KB: 'Kilobyte', MB: 'Megabyte', GB: 'Gigabyte', TB: 'Terabyte'};
const rates = {B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('from').value = 'MB';
document.getElementById('to').value = 'GB';

function convertData() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(6);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertData();
`
    },
    
    'html-entities': {
        title: 'HTML Entities Encoder/Decoder',
        description: 'Encode or decode HTML entities',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter text...' },
        buttons: [
            { text: 'Encode', action: 'encodeHTML()', primary: true },
            { text: 'Decode', action: 'decodeHTML()', secondary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Result', readonly: true },
        script: `
function encodeHTML() {
    const text = document.getElementById('input').value;
    const div = document.createElement('div');
    div.textContent = text;
    document.getElementById('output').value = div.innerHTML;
}
function decodeHTML() {
    const text = document.getElementById('input').value;
    const div = document.createElement('div');
    div.innerHTML = text;
    document.getElementById('output').value = div.textContent;
}
`
    },
    
    'remove-duplicates': {
        title: 'Remove Duplicate Lines',
        description: 'Remove duplicate lines from text',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter lines of text...' },
        buttons: [
            { text: 'Remove Duplicates', action: 'removeDupes()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Unique Lines', readonly: true },
        script: `
function removeDupes() {
    const text = document.getElementById('input').value;
    const lines = text.split('\\n');
    const unique = [...new Set(lines)];
    document.getElementById('output').value = unique.join('\\n');
}
`
    },
    
    'sort-lines': {
        title: 'Sort Lines',
        description: 'Sort text lines alphabetically',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter lines of text...' },
        buttons: [
            { text: 'Sort A-Z', action: 'sortLines(false)', primary: true },
            { text: 'Sort Z-A', action: 'sortLines(true)', secondary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Sorted Lines', readonly: true },
        script: `
function sortLines(reverse) {
    const text = document.getElementById('input').value;
    const lines = text.split('\\n');
    lines.sort();
    if (reverse) lines.reverse();
    document.getElementById('output').value = lines.join('\\n');
}
`
    },
    
    'color-converter': {
        title: 'Color Converter',
        description: 'Convert between color formats (HEX, RGB, HSL)',
        inputs: [
            { id: 'colorInput', label: 'Color', type: 'color', value: '#3b82f6' }
        ],
        outputType: 'custom',
        script: `
function updateColor() {
    const hex = document.getElementById('colorInput').value;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    
    document.getElementById('output').innerHTML = \`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="padding: 1rem; background: \${hex}; border-radius: 8px; height: 80px;"></div>
            <div style="font-family: monospace; display: flex; flex-direction: column; gap: 0.5rem;">
                <div><strong>HEX:</strong> \${hex}</div>
                <div><strong>RGB:</strong> rgb(\${r}, \${g}, \${b})</div>
            </div>
        </div>
    \`;
}
document.getElementById('colorInput').addEventListener('input', updateColor);
updateColor();
`
    },
    
    'qr-generator': {
        title: 'QR Code Generator',
        description: 'Generate QR codes from text or URLs',
        textareaInput: { id: 'input', label: 'Text or URL', placeholder: 'Enter text or URL...' },
        buttons: [{ text: 'Generate QR Code', action: 'generateQR()', primary: true }],
        outputType: 'custom',
        script: `
function generateQR() {
    const text = document.getElementById('input').value;
    if (!text) return;
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(text);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <img src="\${qrUrl}" alt="QR Code" style="max-width: 100%; border-radius: 8px; box-shadow: var(--shadow);">
        </div>
    \`;
}
`
    },
    
    'regex-tester': {
        title: 'Regex Tester',
        description: 'Test regular expressions',
        inputs: [
            { id: 'pattern', label: 'Regex Pattern', type: 'text', placeholder: '/pattern/flags' },
            { id: 'flags', label: 'Flags', type: 'text', placeholder: 'g, i, m', value: 'g' }
        ],
        textareaInput: { id: 'input', label: 'Test String', placeholder: 'Enter text to test...' },
        buttons: [{ text: 'Test Regex', action: 'testRegex()', primary: true }],
        outputType: 'custom',
        script: `
function testRegex() {
    const pattern = document.getElementById('pattern').value;
    const flags = document.getElementById('flags').value;
    const text = document.getElementById('input').value;
    
    try {
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex) || [];
        document.getElementById('output').innerHTML = \`
            <div><strong>Matches Found:</strong> \${matches.length}</div>
            <div style="margin-top: 0.75rem;"><strong>Matches:</strong></div>
            <div style="font-family: monospace; padding: 0.75rem; background: var(--bg-gray); border-radius: 6px; max-height: 200px; overflow-y: auto;">
                \${matches.length ? matches.join('<br>') : 'No matches'}
            </div>
        \`;
    } catch(e) {
        UniversalToast.error('Invalid regex: ' + e.message);
    }
}
`
    },
    
    'jwt-decoder': {
        title: 'JWT Decoder',
        description: 'Decode JSON Web Tokens',
        textareaInput: { id: 'input', label: 'JWT Token', placeholder: 'Paste JWT token...' },
        buttons: [{ text: 'Decode', action: 'decodeJWT()', primary: true }],
        outputType: 'custom',
        script: `
function decodeJWT() {
    const token = document.getElementById('input').value.trim();
    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid JWT');
        
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        
        document.getElementById('output').innerHTML = \`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <strong>Header:</strong>
                    <pre style="background: var(--bg-gray); padding: 0.75rem; border-radius: 6px; overflow-x: auto;">\${JSON.stringify(header, null, 2)}</pre>
                </div>
                <div>
                    <strong>Payload:</strong>
                    <pre style="background: var(--bg-gray); padding: 0.75rem; border-radius: 6px; overflow-x: auto;">\${JSON.stringify(payload, null, 2)}</pre>
                </div>
            </div>
        \`;
    } catch(e) {
        UniversalToast.error('Invalid JWT token');
    }
}
`
    },
    
    'css-minify': {
        title: 'CSS Minifier',
        description: 'Minify CSS code',
        textareaInput: { id: 'input', label: 'CSS Input', placeholder: 'Enter CSS...' },
        buttons: [
            { text: 'Minify', action: 'minifyCSS()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Minified CSS', readonly: true },
        script: `
function minifyCSS() {
    let css = document.getElementById('input').value;
    css = css.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');
    css = css.replace(/\\s+/g, ' ');
    css = css.replace(/\\s*([{}:;,])\\s*/g, '$1');
    css = css.trim();
    document.getElementById('output').value = css;
}
`
    },
    
    'js-minify': {
        title: 'JavaScript Minifier',
        description: 'Minify JavaScript code',
        textareaInput: { id: 'input', label: 'JavaScript Input', placeholder: 'Enter JavaScript...' },
        buttons: [
            { text: 'Minify', action: 'minifyJS()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Minified JavaScript', readonly: true },
        script: `
function minifyJS() {
    let js = document.getElementById('input').value;
    js = js.replace(/\\/\\/.*$/gm, '');
    js = js.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');
    js = js.replace(/\\s+/g, ' ');
    js = js.trim();
    document.getElementById('output').value = js;
}
`
    },
    
    'xml-formatter': {
        title: 'XML Formatter',
        description: 'Format and beautify XML',
        textareaInput: { id: 'input', label: 'XML Input', placeholder: 'Enter XML...' },
        buttons: [
            { text: 'Format', action: 'formatXML()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Formatted XML', readonly: true },
        script: `
function formatXML() {
    const xml = document.getElementById('input').value;
    try {
        const formatted = xml.replace(/(>)(<)(\\/*)/g, '$1\\n$2$3')
            .split('\\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\\n');
        document.getElementById('output').value = formatted;
    } catch(e) {
        UniversalToast.error('Invalid XML');
    }
}
`
    },
    
    'json-to-csv': {
        title: 'JSON to CSV Converter',
        description: 'Convert JSON to CSV format',
        textareaInput: { id: 'input', label: 'JSON Input', placeholder: '[{"name":"John","age":30}]' },
        buttons: [
            { text: 'Convert to CSV', action: 'jsonToCSV()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'CSV Output', readonly: true },
        script: `
function jsonToCSV() {
    try {
        const json = JSON.parse(document.getElementById('input').value);
        const array = Array.isArray(json) ? json : [json];
        if (!array.length) return;
        
        const keys = Object.keys(array[0]);
        const csv = [
            keys.join(','),
            ...array.map(row => keys.map(key => JSON.stringify(row[key])).join(','))
        ].join('\\n');
        
        document.getElementById('output').value = csv;
    } catch(e) {
        UniversalToast.error('Invalid JSON');
    }
}
`
    },
    
    'csv-to-json': {
        title: 'CSV to JSON Converter',
        description: 'Convert CSV to JSON format',
        textareaInput: { id: 'input', label: 'CSV Input', placeholder: 'name,age\\nJohn,30' },
        buttons: [
            { text: 'Convert to JSON', action: 'csvToJSON()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'JSON Output', readonly: true },
        script: `
function csvToJSON() {
    try {
        const csv = document.getElementById('input').value;
        const lines = csv.split('\\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        const result = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i] ? values[i].trim() : '';
                return obj;
            }, {});
        });
        document.getElementById('output').value = JSON.stringify(result, null, 2);
    } catch(e) {
        UniversalToast.error('Invalid CSV');
    }
}
`
    },
    
    'stopwatch': {
        title: 'Stopwatch',
        description: 'Simple stopwatch timer',
        buttons: [
            { text: 'Start', action: 'startStopwatch()', primary: true },
            { text: 'Stop', action: 'stopStopwatch()', secondary: true },
            { text: 'Reset', action: 'resetStopwatch()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let startTime = 0, elapsed = 0, timer = null;

function startStopwatch() {
    if (!timer) {
        startTime = Date.now() - elapsed;
        timer = setInterval(updateTime, 10);
    }
}

function stopStopwatch() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsed = 0;
    updateTime();
}

function updateTime() {
    elapsed = Date.now() - startTime;
    const ms = Math.floor(elapsed % 1000 / 10);
    const secs = Math.floor(elapsed / 1000 % 60);
    const mins = Math.floor(elapsed / 60000 % 60);
    const hrs = Math.floor(elapsed / 3600000);
    
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center; font-size: 3rem; font-weight: 700; font-family: monospace;">
            \${hrs.toString().padStart(2,'0')}:\${mins.toString().padStart(2,'0')}:\${secs.toString().padStart(2,'0')}.\${ms.toString().padStart(2,'0')}
        </div>
    \`;
}
updateTime();
`
    },
    
    'countdown-timer': {
        title: 'Countdown Timer',
        description: 'Set a countdown timer',
        inputs: [
            { id: 'minutes', label: 'Minutes', type: 'number', value: '5', min: '0' },
            { id: 'seconds', label: 'Seconds', type: 'number', value: '0', min: '0', max: '59' }
        ],
        buttons: [
            { text: 'Start', action: 'startCountdown()', primary: true },
            { text: 'Stop', action: 'stopCountdown()', secondary: true },
            { text: 'Reset', action: 'resetCountdown()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let countdownTimer = null, remaining = 0;

function startCountdown() {
    if (!countdownTimer) {
        const mins = parseInt(document.getElementById('minutes').value);
        const secs = parseInt(document.getElementById('seconds').value);
        remaining = (mins * 60 + secs) * 1000;
        const end = Date.now() + remaining;
        
        countdownTimer = setInterval(() => {
            remaining = end - Date.now();
            if (remaining <= 0) {
                stopCountdown();
                remaining = 0;
                UniversalToast.success('Time is up!');
            }
            updateCountdown();
        }, 100);
    }
}

function stopCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

function resetCountdown() {
    stopCountdown();
    remaining = 0;
    updateCountdown();
}

function updateCountdown() {
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor(remaining % 60000 / 1000);
    
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center; font-size: 3.5rem; font-weight: 700; font-family: monospace;">
            \${mins.toString().padStart(2,'0')}:\${secs.toString().padStart(2,'0')}
        </div>
    \`;
}
updateCountdown();
`
    },
    
    'markdown-preview': {
        title: 'Markdown Preview',
        description: 'Preview Markdown as HTML',
        textareaInput: { id: 'input', label: 'Markdown Input', placeholder: '# Hello\\n\\nWrite **markdown** here...' },
        buttons: [{ text: 'Preview', action: 'previewMarkdown()', primary: true }],
        outputType: 'custom',
        script: `
function previewMarkdown() {
    let md = document.getElementById('input').value;
    md = md.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    md = md.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    md = md.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    md = md.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    md = md.replace(/\\*(.+?)\\*/g, '<em>$1</em>');
    md = md.replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<a href="$2">$1</a>');
    md = md.replace(/\\n/g, '<br>');
    document.getElementById('output').innerHTML = '<div style="padding: 1rem;">' + md + '</div>';
}
`
    },
    
    'text-to-speech': {
        title: 'Text to Speech',
        description: 'Convert text to speech using browser TTS',
        textareaInput: { id: 'input', label: 'Text Input', placeholder: 'Enter text to speak...' },
        buttons: [
            { text: 'Speak', action: 'speak()', primary: true },
            { text: 'Stop', action: 'stopSpeech()', secondary: true }
        ],
        outputType: 'custom',
        script: `
function speak() {
    const text = document.getElementById('input').value;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    document.getElementById('output').innerHTML = '<div style="text-align: center; color: var(--success);">🔊 Speaking...</div>';
}
function stopSpeech() {
    speechSynthesis.cancel();
    document.getElementById('output').innerHTML = '<div style="text-align: center; color: var(--text-secondary);">Stopped</div>';
}
`
    },
    
    'text-diff': {
        title: 'Text Diff Checker',
        description: 'Compare two texts and show differences',
        textareaInput: { id: 'input', label: 'Text 1', placeholder: 'Enter first text...' },
        textareaOutput: { id: 'input2', label: 'Text 2' },
        buttons: [{ text: 'Compare', action: 'compareDiff()', primary: true }],
        outputType: 'custom',
        script: `
function compareDiff() {
    const text1 = document.getElementById('input').value.split('\\n');
    const text2 = document.getElementById('input2').value.split('\\n');
    const maxLen = Math.max(text1.length, text2.length);
    let html = '<div style="display: grid; gap: 0.5rem;">';
    
    for (let i = 0; i < maxLen; i++) {
        const line1 = text1[i] || '';
        const line2 = text2[i] || '';
        const same = line1 === line2;
        const color = same ? 'var(--bg-gray)' : '#fef2f2';
        html += \`<div style="padding: 0.5rem; background: \${color}; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">\${line1 || '(empty)'}</div>\`;
    }
    html += '</div>';
    document.getElementById('output').innerHTML = html;
}
`
    },
    
    'lorem-ipsum': {
        title: 'Lorem Ipsum Generator',
        description: 'Generate Lorem Ipsum placeholder text',
        inputs: [
            { id: 'count', label: 'Paragraphs', type: 'number', value: '3', min: '1', max: '10' }
        ],
        buttons: [
            { text: 'Generate', action: 'generateLorem2()', primary: true },
            { text: 'Copy', action: 'copyFromElement("output")', secondary: true }
        ],
        textareaOutput: { id: 'output', label: 'Generated Text', readonly: true },
        script: `
function generateLorem2() {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const count = parseInt(document.getElementById('count').value);
    document.getElementById('output').value = Array(count).fill(lorem).join('\\n\\n');
}
generateLorem2();
`
    },
    
    'gradient-generator': {
        title: 'CSS Gradient Generator',
        description: 'Create CSS gradients visually',
        inputs: [
            { id: 'color1', label: 'Color 1', type: 'color', value: '#667eea' },
            { id: 'color2', label: 'Color 2', type: 'color', value: '#764ba2' }
        ],
        buttons: [{ text: 'Generate', action: 'generateGradient()', primary: true }],
        outputType: 'custom',
        script: `
function generateGradient() {
    const c1 = document.getElementById('color1').value;
    const c2 = document.getElementById('color2').value;
    const css = \`linear-gradient(135deg, \${c1}, \${c2})\`;
    
    document.getElementById('output').innerHTML = \`
        <div style="background: \${css}; height: 100px; border-radius: 8px; margin-bottom: 1rem;"></div>
        <div style="font-family: monospace; padding: 0.75rem; background: var(--bg-gray); border-radius: 6px;">
            background: \${css};
        </div>
    \`;
}
generateGradient();
document.getElementById('color1').addEventListener('input', generateGradient);
document.getElementById('color2').addEventListener('input', generateGradient);
`
    },
    
    'color-picker': {
        title: 'Color Picker',
        description: 'Pick and preview colors',
        inputs: [
            { id: 'colorPick', label: 'Pick Color', type: 'color', value: '#3b82f6' }
        ],
        outputType: 'custom',
        script: `
function updateColorPick() {
    const hex = document.getElementById('colorPick').value;
    document.getElementById('output').innerHTML = \`
        <div style="background: \${hex}; height: 150px; border-radius: 8px; margin-bottom: 1rem;"></div>
        <div style="text-align: center; font-size: 2rem; font-weight: 700;">\${hex}</div>
    \`;
}
document.getElementById('colorPick').addEventListener('input', updateColorPick);
updateColorPick();
`
    },
    
    'time-converter': {
        title: 'Time Converter',
        description: 'Convert between time units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertTime()', primary: true }],
        outputType: 'custom',
        script: `
const units = {sec: 'Second', min: 'Minute', hr: 'Hour', day: 'Day', wk: 'Week', mo: 'Month', yr: 'Year'};
const rates = {sec: 1, min: 60, hr: 3600, day: 86400, wk: 604800, mo: 2592000, yr: 31536000};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('from').value = 'hr';

function convertTime() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}s</div>
        </div>
    \`;
}
convertTime();
`
    },
    
    'timezone-converter': {
        title: 'Timezone Converter',
        description: 'Convert time between timezones',
        inputs: [
            { id: 'timeInput', label: 'Time', type: 'datetime-local' }
        ],
        buttons: [{ text: 'Convert', action: 'convertTimezone()', primary: true }],
        outputType: 'custom',
        script: `
document.getElementById('timeInput').value = new Date().toISOString().slice(0,16);

function convertTimezone() {
    const time = document.getElementById('timeInput').value;
    const date = new Date(time);
    
    document.getElementById('output').innerHTML = \`
        <div style="display: grid; gap: 0.5rem;">
            <div><strong>UTC:</strong> \${date.toUTCString()}</div>
            <div><strong>Local:</strong> \${date.toLocaleString()}</div>
            <div><strong>ISO:</strong> \${date.toISOString()}</div>
            <div><strong>Unix:</strong> \${Math.floor(date.getTime() / 1000)}</div>
        </div>
    \`;
}
convertTimezone();
`
    },
    
    'pressure-converter': {
        title: 'Pressure Converter',
        description: 'Convert between pressure units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertPressure()', primary: true }],
        outputType: 'custom',
        script: `
const units = {pa: 'Pascal', kpa: 'Kilopascal', bar: 'Bar', psi: 'PSI', atm: 'Atmosphere'};
const rates = {pa: 1, kpa: 1000, bar: 100000, psi: 6894.76, atm: 101325};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertPressure() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertPressure();
`
    },
    
    'energy-converter': {
        title: 'Energy Converter',
        description: 'Convert between energy units',
        inputs: [
            { id: 'value', label: 'Value', type: 'number', value: '1' },
            { id: 'from', label: 'From', type: 'select' },
            { id: 'to', label: 'To', type: 'select' }
        ],
        buttons: [{ text: 'Convert', action: 'convertEnergy()', primary: true }],
        outputType: 'custom',
        script: `
const units = {j: 'Joule', kj: 'Kilojoule', cal: 'Calorie', kcal: 'Kilocalorie', wh: 'Watt-hour', kwh: 'Kilowatt-hour'};
const rates = {j: 1, kj: 1000, cal: 4.184, kcal: 4184, wh: 3600, kwh: 3600000};
document.getElementById('from').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');
document.getElementById('to').innerHTML = Object.entries(units).map(([k,v]) => \`<option value="\${k}">\${v}</option>\`).join('');

function convertEnergy() {
    const val = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = (val * rates[from] / rates[to]).toFixed(4);
    document.getElementById('output').innerHTML = \`
        <div style="text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 700;">\${result}</div>
            <div style="color: var(--text-secondary); margin-top: 0.5rem;">\${units[to]}</div>
        </div>
    \`;
}
convertEnergy();
`
    },
    
    'jpg-to-png': {
        title: 'JPG to PNG Converter',
        description: 'Convert JPG images to PNG format',
        fileUpload: true,
        buttons: [{ text: 'Download PNG', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()" id="dropZone"><div class="upload-icon">📁</div><div class="upload-text">Click to upload JPG</div><div class="upload-hint">Or drag and drop</div></div><input type="file" id="fileInput" accept="image/jpeg,image/jpg" style="display:none">';

document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            // Show preview in upload zone
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)">';
            
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            convertedCanvas.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/png') + '" style="max-width:100%;border-radius:8px;box-shadow:var(--shadow)"></div>';
            UniversalToast.success('Image converted to PNG!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadConverted() {
    if (!convertedCanvas) {
        UniversalToast.error('Please upload an image first');
        return;
    }
    convertedCanvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.png';
        a.click();
        UniversalToast.success('Downloaded!');
    }, 'image/png');
}
`
    },
    
    'png-to-jpg': {
        title: 'PNG to JPG Converter',
        description: 'Convert PNG images to JPG format',
        fileUpload: true,
        buttons: [{ text: 'Download JPG', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload PNG</div><div class="upload-hint">Or drag and drop</div></div><input type="file" id="fileInput" accept="image/png" style="display:none">';

document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)"><div style="margin-top:0.5rem;font-size:0.875rem;color:#10b981">? Loaded</div>';
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            const ctx = convertedCanvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, convertedCanvas.width, convertedCanvas.height);
            ctx.drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/jpeg', 0.95) + '" style="max-width:100%;border-radius:8px;box-shadow:var(--shadow)"></div>';
            UniversalToast.success('Image converted to JPG!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadConverted() {
    if (!convertedCanvas) {
        UniversalToast.error('Please upload an image first');
        return;
    }
    convertedCanvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.jpg';
        a.click();
        UniversalToast.success('Downloaded!');
    }, 'image/jpeg', 0.95);
}
`
    },
    
    'jpg-to-webp': {
        title: 'JPG to WebP Converter',
        description: 'Convert JPG to WebP format',
        fileUpload: true,
        buttons: [{ text: 'Download WebP', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload JPG</div></div><input type="file" id="fileInput" accept="image/jpeg" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)"><div style="margin-top:0.5rem;font-size:0.875rem;color:#10b981">? Loaded</div>';
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            convertedCanvas.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/webp') + '" style="max-width:100%;border-radius:8px"></div>';
            UniversalToast.success('Converted to WebP!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
function downloadConverted() {
    if (!convertedCanvas) return UniversalToast.error('Upload image first');
    convertedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'converted.webp';
        a.click();
        UniversalToast.success('Downloaded!');
    }, 'image/webp');
}
`
    },
    
    'webp-to-jpg': {
        title: 'WebP to JPG Converter',
        description: 'Convert WebP to JPG format',
        fileUpload: true,
        buttons: [{ text: 'Download JPG', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload WebP</div></div><input type="file" id="fileInput" accept="image/webp" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)"><div style="margin-top:0.5rem;font-size:0.875rem;color:#10b981">? Loaded</div>';
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            const ctx = convertedCanvas.getContext('2d');
            ctx.fillStyle = '#FFF';
            ctx.fillRect(0, 0, convertedCanvas.width, convertedCanvas.height);
            ctx.drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/jpeg') + '" style="max-width:100%;border-radius:8px"></div>';
            UniversalToast.success('Converted to JPG!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
function downloadConverted() {
    if (!convertedCanvas) return UniversalToast.error('Upload image first');
    convertedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'converted.jpg';
        a.click();
        UniversalToast.success('Downloaded!');
    }, 'image/jpeg');
}
`
    },
    
    'png-to-webp': {
        title: 'PNG to WebP Converter',
        description: 'Convert PNG to WebP format',
        fileUpload: true,
        buttons: [{ text: 'Download WebP', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload PNG</div></div><input type="file" id="fileInput" accept="image/png" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)"><div style="margin-top:0.5rem;font-size:0.875rem;color:#10b981">? Loaded</div>';
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            convertedCanvas.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/webp') + '" style="max-width:100%;border-radius:8px"></div>';
            UniversalToast.success('Converted!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
function downloadConverted() {
    if (!convertedCanvas) return UniversalToast.error('Upload image first');
    convertedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'converted.webp';
        a.click();
    }, 'image/webp');
}
`
    },
    
    'webp-to-png': {
        title: 'WebP to PNG Converter',
        description: 'Convert WebP to PNG format',
        fileUpload: true,
        buttons: [{ text: 'Download PNG', action: 'downloadConverted()', primary: true }],
        outputType: 'custom',
        script: `
let convertedCanvas = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload WebP</div></div><input type="file" id="fileInput" accept="image/webp" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)"><div style="margin-top:0.5rem;font-size:0.875rem;color:#10b981">? Loaded</div>';
            convertedCanvas = document.createElement('canvas');
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            convertedCanvas.getContext('2d').drawImage(img, 0, 0);
            document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + convertedCanvas.toDataURL('image/png') + '" style="max-width:100%;border-radius:8px"></div>';
            UniversalToast.success('Converted!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
function downloadConverted() {
    if (!convertedCanvas) return UniversalToast.error('Upload image first');
    convertedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'converted.png';
        a.click();
    }, 'image/png');
}
`
    },
    
    'heic-to-jpg': {
        title: 'HEIC to JPG Converter',
        description: 'Convert HEIC to JPG (requires online service)',
        outputType: 'custom',
        script: `
document.getElementById('output').innerHTML = '<div style="text-align:center;padding:2rem;"><div style="font-size:1.2rem;color:var(--text-secondary);">⚠️ HEIC conversion requires specialized libraries.<br><br>Please use online services like <a href="https://heictojpg.com" target="_blank" style="color:var(--primary)">heictojpg.com</a></div></div>';
`
    },
    
    'image-resize': {
        title: 'Image Resizer',
        description: 'Resize images to custom dimensions',
        fileUpload: true,
        inputs: [
            { id: 'width', label: 'Width (px)', type: 'number', value: '800' },
            { id: 'height', label: 'Height (px)', type: 'number', value: '600' }
        ],
        buttons: [
            { text: 'Resize', action: 'resizeImage()', primary: true },
            { text: 'Download', action: 'downloadResized()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let resizedCanvas = null, originalImg = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()" id="dropZone"><div class="upload-icon">📁</div><div class="upload-text">Click to upload image</div></div><input type="file" id="fileInput" accept="image/*" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        originalImg = new Image();
        originalImg.onload = () => {
            // Show preview in upload zone
            document.getElementById('dropZone').innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;max-height:200px;border-radius:8px;box-shadow:var(--shadow)">';
            
            document.getElementById('width').value = originalImg.width;
            document.getElementById('height').value = originalImg.height;
            UniversalToast.success('Image loaded!');
        };
        originalImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function resizeImage() {
    if (!originalImg) return UniversalToast.error('Upload image first');
    const w = parseInt(document.getElementById('width').value);
    const h = parseInt(document.getElementById('height').value);
    resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = w;
    resizedCanvas.height = h;
    resizedCanvas.getContext('2d').drawImage(originalImg, 0, 0, w, h);
    document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + resizedCanvas.toDataURL() + '" style="max-width:100%;border-radius:8px"></div>';
    UniversalToast.success('Image resized!');
}

function downloadResized() {
    if (!resizedCanvas) return UniversalToast.error('Resize image first');
    resizedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'resized.png';
        a.click();
    });
}
`
    },
    
    'image-compress': {
        title: 'Image Compressor',
        description: 'Compress images to reduce file size',
        fileUpload: true,
        inputs: [
            { id: 'quality', label: 'Quality (0-100)', type: 'number', value: '80', min: '1', max: '100' }
        ],
        buttons: [
            { text: 'Compress', action: 'compressImage()', primary: true },
            { text: 'Download', action: 'downloadCompressed()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let compressedCanvas = null, originalImg = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload image</div></div><input type="file" id="fileInput" accept="image/*" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        originalImg = new Image();
        originalImg.src = event.target.result;
        UniversalToast.success('Image loaded!');
    };
    reader.readAsDataURL(file);
});

function compressImage() {
    if (!originalImg) return UniversalToast.error('Upload image first');
    const quality = parseInt(document.getElementById('quality').value) / 100;
    compressedCanvas = document.createElement('canvas');
    compressedCanvas.width = originalImg.width;
    compressedCanvas.height = originalImg.height;
    compressedCanvas.getContext('2d').drawImage(originalImg, 0, 0);
    document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + compressedCanvas.toDataURL('image/jpeg', quality) + '" style="max-width:100%;border-radius:8px"></div>';
    UniversalToast.success('Image compressed!');
}

function downloadCompressed() {
    if (!compressedCanvas) return UniversalToast.error('Compress image first');
    const quality = parseInt(document.getElementById('quality').value) / 100;
    compressedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'compressed.jpg';
        a.click();
    }, 'image/jpeg', quality);
}
`
    },
    
    'image-rotate': {
        title: 'Image Rotator',
        description: 'Rotate images by degrees',
        fileUpload: true,
        inputs: [
            { id: 'angle', label: 'Angle (degrees)', type: 'number', value: '90' }
        ],
        buttons: [
            { text: 'Rotate', action: 'rotateImage()', primary: true },
            { text: 'Download', action: 'downloadRotated()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let rotatedCanvas = null, originalImg = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload image</div></div><input type="file" id="fileInput" accept="image/*" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        originalImg = new Image();
        originalImg.src = event.target.result;
        UniversalToast.success('Image loaded!');
    };
    reader.readAsDataURL(file);
});

function rotateImage() {
    if (!originalImg) return UniversalToast.error('Upload image first');
    const angle = parseInt(document.getElementById('angle').value) * Math.PI / 180;
    rotatedCanvas = document.createElement('canvas');
    rotatedCanvas.width = originalImg.width;
    rotatedCanvas.height = originalImg.height;
    const ctx = rotatedCanvas.getContext('2d');
    ctx.translate(rotatedCanvas.width/2, rotatedCanvas.height/2);
    ctx.rotate(angle);
    ctx.drawImage(originalImg, -originalImg.width/2, -originalImg.height/2);
    document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + rotatedCanvas.toDataURL() + '" style="max-width:100%;border-radius:8px"></div>';
    UniversalToast.success('Image rotated!');
}

function downloadRotated() {
    if (!rotatedCanvas) return UniversalToast.error('Rotate image first');
    rotatedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'rotated.png';
        a.click();
    });
}
`
    },
    
    'image-flip': {
        title: 'Image Flipper',
        description: 'Flip images horizontally or vertically',
        fileUpload: true,
        buttons: [
            { text: 'Flip Horizontal', action: 'flipImage("h")', primary: true },
            { text: 'Flip Vertical', action: 'flipImage("v")', secondary: true },
            { text: 'Download', action: 'downloadFlipped()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let flippedCanvas = null, originalImg = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload image</div></div><input type="file" id="fileInput" accept="image/*" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        originalImg = new Image();
        originalImg.src = event.target.result;
        UniversalToast.success('Image loaded!');
    };
    reader.readAsDataURL(file);
});

function flipImage(dir) {
    if (!originalImg) return UniversalToast.error('Upload image first');
    flippedCanvas = document.createElement('canvas');
    flippedCanvas.width = originalImg.width;
    flippedCanvas.height = originalImg.height;
    const ctx = flippedCanvas.getContext('2d');
    ctx.save();
    if (dir === 'h') {
        ctx.scale(-1, 1);
        ctx.drawImage(originalImg, -originalImg.width, 0);
    } else {
        ctx.scale(1, -1);
        ctx.drawImage(originalImg, 0, -originalImg.height);
    }
    ctx.restore();
    document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + flippedCanvas.toDataURL() + '" style="max-width:100%;border-radius:8px"></div>';
    UniversalToast.success('Image flipped!');
}

function downloadFlipped() {
    if (!flippedCanvas) return UniversalToast.error('Flip image first');
    flippedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'flipped.png';
        a.click();
    });
}
`
    },
    
    'image-crop': {
        title: 'Image Cropper',
        description: 'Crop images (simple center crop)',
        fileUpload: true,
        inputs: [
            { id: 'cropWidth', label: 'Width', type: 'number', value: '400' },
            { id: 'cropHeight', label: 'Height', type: 'number', value: '400' }
        ],
        buttons: [
            { text: 'Crop', action: 'cropImage()', primary: true },
            { text: 'Download', action: 'downloadCropped()', secondary: true }
        ],
        outputType: 'custom',
        script: `
let croppedCanvas = null, originalImg = null;
const zone = document.getElementById('uploadZone');
zone.innerHTML = '<div class="file-upload-zone" id="dropZone" onclick="document.getElementById(\\'fileInput\\').click()"><div class="upload-icon">📁</div><div class="upload-text">Click to upload image</div></div><input type="file" id="fileInput" accept="image/*" style="display:none">';
document.getElementById('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
        originalImg = new Image();
        originalImg.src = event.target.result;
        UniversalToast.success('Image loaded!');
    };
    reader.readAsDataURL(file);
});

function cropImage() {
    if (!originalImg) return UniversalToast.error('Upload image first');
    const w = parseInt(document.getElementById('cropWidth').value);
    const h = parseInt(document.getElementById('cropHeight').value);
    croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = w;
    croppedCanvas.height = h;
    const ctx = croppedCanvas.getContext('2d');
    const sx = (originalImg.width - w) / 2;
    const sy = (originalImg.height - h) / 2;
    ctx.drawImage(originalImg, sx, sy, w, h, 0, 0, w, h);
    document.getElementById('output').innerHTML = '<div style="text-align:center"><img src="' + croppedCanvas.toDataURL() + '" style="max-width:100%;border-radius:8px"></div>';
    UniversalToast.success('Image cropped!');
}

function downloadCropped() {
    if (!croppedCanvas) return UniversalToast.error('Crop image first');
    croppedCanvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'cropped.png';
        a.click();
    });
}
`
    },

    // PDF TOOLS
    'pdf-merger': {
        title: 'PDF Merger',
        description: 'Combine multiple PDF files into one document',
        fileUpload: { accept: '.pdf', multiple: true, id: 'pdfFiles' },
        buttons: [
            { text: '📄 Merge PDFs', action: 'mergePDFs()', primary: true }
        ],
        outputType: 'custom',
        script: `
const pdfFiles = [];

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        pdfFiles.length = 0;
        pdfFiles.push(...Array.from(files).filter(f => f.type === 'application/pdf'));
        if (pdfFiles.length === 0) {
            UniversalToast.error('Please upload PDF files only');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${pdfFiles.length} PDF file(s) selected
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    Click "Merge PDFs" to combine them
                </div>
            </div>
        \`;
        UniversalToast.success(\`\${pdfFiles.length} PDF files loaded\`);
    }
});

function mergePDFs() {
    if (pdfFiles.length < 2) {
        UniversalToast.error('Please upload at least 2 PDF files');
        return;
    }
    UniversalToast.info('PDF merging requires backend processing. Feature coming soon!');
}
`
    },

    'pdf-splitter': {
        title: 'PDF Splitter',
        description: 'Split PDF into separate pages or extract specific pages',
        fileUpload: { accept: '.pdf', id: 'pdfFile' },
        buttons: [
            { text: '📑 Split PDF', action: 'splitPDF()', primary: true }
        ],
        outputType: 'custom',
        script: `
let pdfFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        pdfFile = files[0];
        if (pdfFile.type !== 'application/pdf') {
            UniversalToast.error('Please upload a PDF file');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${pdfFile.name}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    \${(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
            </div>
        \`;
        UniversalToast.success('PDF loaded successfully');
    }
});

function splitPDF() {
    if (!pdfFile) {
        UniversalToast.error('Please upload a PDF file first');
        return;
    }
    UniversalToast.info('PDF splitting requires backend processing. Feature coming soon!');
}
`
    },

    'pdf-compressor': {
        title: 'PDF Compressor',
        description: 'Reduce PDF file size while maintaining quality',
        fileUpload: { accept: '.pdf', id: 'pdfFile' },
        buttons: [
            { text: '🗜️ Compress PDF', action: 'compressPDF()', primary: true }
        ],
        outputType: 'custom',
        script: `
let pdfFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        pdfFile = files[0];
        if (pdfFile.type !== 'application/pdf') {
            UniversalToast.error('Please upload a PDF file');
            return;
        }
        const sizeMB = (pdfFile.size / 1024 / 1024).toFixed(2);
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${pdfFile.name}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    Original size: \${sizeMB} MB
                </div>
            </div>
        \`;
        UniversalToast.success('PDF loaded successfully');
    }
});

function compressPDF() {
    if (!pdfFile) {
        UniversalToast.error('Please upload a PDF file first');
        return;
    }
    UniversalToast.info('PDF compression requires backend processing. Feature coming soon!');
}
`
    },

    'word-to-pdf': {
        title: 'Word to PDF Converter',
        description: 'Convert Word documents (.docx, .doc) to PDF format',
        fileUpload: { accept: '.doc,.docx', id: 'wordFile' },
        buttons: [
            { text: '📄 Convert to PDF', action: 'convertToPDF()', primary: true }
        ],
        outputType: 'custom',
        script: `
let wordFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        wordFile = files[0];
        const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(wordFile.type)) {
            UniversalToast.error('Please upload a Word document (.doc or .docx)');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${wordFile.name}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    \${(wordFile.size / 1024).toFixed(2)} KB
                </div>
            </div>
        \`;
        UniversalToast.success('Word document loaded');
    }
});

function convertToPDF() {
    if (!wordFile) {
        UniversalToast.error('Please upload a Word document first');
        return;
    }
    UniversalToast.info('Document conversion requires backend processing. Feature coming soon!');
}
`
    },

    'excel-to-pdf': {
        title: 'Excel to PDF Converter',
        description: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF format',
        fileUpload: { accept: '.xls,.xlsx', id: 'excelFile' },
        buttons: [
            { text: '📊 Convert to PDF', action: 'convertExcelToPDF()', primary: true }
        ],
        outputType: 'custom',
        script: `
let excelFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        excelFile = files[0];
        const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(excelFile.type)) {
            UniversalToast.error('Please upload an Excel file (.xls or .xlsx)');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${excelFile.name}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    \${(excelFile.size / 1024).toFixed(2)} KB
                </div>
            </div>
        \`;
        UniversalToast.success('Excel file loaded');
    }
});

function convertExcelToPDF() {
    if (!excelFile) {
        UniversalToast.error('Please upload an Excel file first');
        return;
    }
    UniversalToast.info('Spreadsheet conversion requires backend processing. Feature coming soon!');
}
`
    },

    'powerpoint-to-pdf': {
        title: 'PowerPoint to PDF Converter',
        description: 'Convert PowerPoint presentations (.pptx, .ppt) to PDF format',
        fileUpload: { accept: '.ppt,.pptx', id: 'pptFile' },
        buttons: [
            { text: '🎬 Convert to PDF', action: 'convertPPTToPDF()', primary: true }
        ],
        outputType: 'custom',
        script: `
let pptFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        pptFile = files[0];
        const validTypes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        if (!validTypes.includes(pptFile.type)) {
            UniversalToast.error('Please upload a PowerPoint file (.ppt or .pptx)');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎬</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    \${pptFile.name}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    \${(pptFile.size / 1024).toFixed(2)} KB
                </div>
            </div>
        \`;
        UniversalToast.success('PowerPoint file loaded');
    }
});

function convertPPTToPDF() {
    if (!pptFile) {
        UniversalToast.error('Please upload a PowerPoint file first');
        return;
    }
    UniversalToast.info('Presentation conversion requires backend processing. Feature coming soon!');
}
`
    },

    'excel-to-csv': {
        title: 'Excel to CSV Converter',
        description: 'Convert Excel spreadsheets to CSV format',
        fileUpload: { accept: '.xls,.xlsx', id: 'excelFile' },
        buttons: [
            { text: '📊 Convert to CSV', action: 'convertToCSV()', primary: true }
        ],
        outputType: 'custom',
        script: `
let excelFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        excelFile = files[0];
        const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(excelFile.type)) {
            UniversalToast.error('Please upload an Excel file');
            return;
        }
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937;">
                    \${excelFile.name}
                </div>
            </div>
        \`;
        UniversalToast.success('Excel file loaded');
    }
});

function convertToCSV() {
    if (!excelFile) {
        UniversalToast.error('Please upload an Excel file first');
        return;
    }
    UniversalToast.info('Excel to CSV conversion requires backend processing. Feature coming soon!');
}
`
    },

    'word-counter-doc': {
        title: 'Document Word Counter',
        description: 'Count words, characters, and paragraphs in Word/PDF documents',
        fileUpload: { accept: '.doc,.docx,.pdf,.txt', id: 'docFile' },
        buttons: [
            { text: '📊 Analyze Document', action: 'analyzeDocument()', primary: true }
        ],
        outputType: 'custom',
        script: `
let docFile = null;

UniversalUpload.init({
    dropZoneId: 'uploadZone',
    onFilesSelected: (files) => {
        docFile = files[0];
        document.getElementById('dropZone').innerHTML = \`
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937;">
                    \${docFile.name}
                </div>
            </div>
        \`;
        UniversalToast.success('Document loaded');
    }
});

function analyzeDocument() {
    if (!docFile) {
        UniversalToast.error('Please upload a document first');
        return;
    }
    UniversalToast.info('Document analysis requires backend processing. Feature coming soon!');
}
`
    }
};

// Generate HTML template
function generateToolHTML(toolId, config) {
    let inputsHTML = '';
    
    // File upload zone
    if (config.fileUpload) {
        inputsHTML += `
                <div class="content-box">
                    <div class="content-box-header">
                        <span class="content-box-title">Upload Image</span>
                    </div>
                    <div id="uploadZone"></div>
                </div>`;
    }
    
    // Text area input
    if (config.textareaInput) {
        inputsHTML += `
                <div class="content-box">
                    <div class="content-box-header">
                        <span class="content-box-title">${config.textareaInput.label}</span>
                    </div>
                    <textarea id="${config.textareaInput.id}" placeholder="${config.textareaInput.placeholder || ''}"></textarea>
                </div>`;
    }
    
    // Regular inputs
    if (config.inputs && config.inputs.length > 0) {
        inputsHTML += `
                <div class="content-box">
                    <div class="io-section">`;
        config.inputs.forEach(input => {
            if (input.type === 'select') {
                inputsHTML += `
                        <div class="input-group">
                            <label class="input-label">${input.label}</label>
                            <select id="${input.id}"></select>
                        </div>`;
            } else {
                inputsHTML += `
                        <div class="input-group">
                            <label class="input-label">${input.label}</label>
                            <input type="${input.type}" id="${input.id}" 
                                ${input.placeholder ? `placeholder="${input.placeholder}"` : ''}
                                ${input.value ? `value="${input.value}"` : ''}
                                ${input.min ? `min="${input.min}"` : ''}
                                ${input.max ? `max="${input.max}"` : ''}>
                        </div>`;
            }
        });
        inputsHTML += `
                    </div>
                </div>`;
    }
    
    // Checkboxes
    if (config.checkboxes && config.checkboxes.length > 0) {
        inputsHTML += `
                <div class="content-box">
                    <div class="io-section">`;
        config.checkboxes.forEach(checkbox => {
            inputsHTML += `
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="${checkbox.id}" ${checkbox.checked ? 'checked' : ''}>
                            <label for="${checkbox.id}" style="margin: 0; text-transform: none; cursor: pointer;">${checkbox.label}</label>
                        </div>`;
        });
        inputsHTML += `
                    </div>
                </div>`;
    }
    
    // Buttons
    let buttonsHTML = '';
    if (config.buttons && config.buttons.length > 0) {
        buttonsHTML += `
                <div class="btn-group">`;
        config.buttons.forEach(btn => {
            const btnClass = btn.primary ? 'btn-primary' : btn.secondary ? 'btn-secondary' : 'btn-primary';
            buttonsHTML += `
                    <button class="btn ${btnClass}" onclick="${btn.action}">${btn.text}</button>`;
        });
        buttonsHTML += `
                </div>`;
    }
    
    // Output
    let outputHTML = '';
    if (config.textareaOutput) {
        outputHTML = `
                <div class="content-box">
                    <div class="content-box-header">
                        <span class="content-box-title">${config.textareaOutput.label}</span>
                    </div>
                    <textarea id="${config.textareaOutput.id}" ${config.textareaOutput.readonly ? 'readonly' : ''}></textarea>
                </div>`;
    } else if (config.outputType === 'custom') {
        outputHTML = `
                <div class="content-box">
                    <div class="content-box-header">
                        <span class="content-box-title">Results</span>
                    </div>
                    <div id="output"></div>
                </div>`;
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - ConvertHub</title>
    <meta name="description" content="${config.description}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/icons/apple-touch-icon.png">
    <link rel="manifest" href="../site.webmanifest">
    <meta name="theme-color" content="#6366f1">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${config.title} - ConvertHub">
    <meta property="og:description" content="${config.description}">
    <meta property="og:image" content="../assets/icons/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${config.title} - ConvertHub">
    <meta name="twitter:description" content="${config.description}">
    
    <link rel="stylesheet" href="../assets/css/universal-tool.css">
</head>
<body>
    <!-- Universal Header -->
    <header class="universal-header">
        <div class="header-content">
            <a href="../index.html" class="logo">
                <div class="logo-icon">C</div>
                <span>ConvertHub</span>
            </a>
            <nav class="header-nav">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../index.html#tools" class="nav-link">All Tools</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <div class="tool-header">
            <h1>${config.title}</h1>
            <p>${config.description}</p>
        </div>

        <div class="io-section">
${inputsHTML}
${buttonsHTML}
${outputHTML}
        </div>
    </main>

    <script src="../assets/js/universal-tool.js"></script>
    <script>
${config.script || ''}
    </script>
</body>
</html>`;
}

// Generate all tool files
function generateAllTools() {
    const toolsDir = path.join(__dirname, 'tools');
    
    // Create tools directory if it doesn't exist
    if (!fs.existsSync(toolsDir)) {
        fs.mkdirSync(toolsDir, { recursive: true });
    }
    
    let generated = 0;
    for (const [toolId, config] of Object.entries(toolConfigs)) {
        const html = generateToolHTML(toolId, config);
        const filePath = path.join(toolsDir, `${toolId}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✓ Generated ${toolId}.html`);
        generated++;
    }
    
    console.log(`\n✨ Successfully generated ${generated} tool files!`);
}

// Run generator
generateAllTools();
