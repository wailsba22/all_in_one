const fs = require('fs');
const path = require('path');

// Tool configurations with their specific logic
const toolConfigs = {
    'age-calculator': {
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, days, and more',
        inputs: [
            { id: 'birthdate', label: 'Birth Date', type: 'date' }
        ],
        buttons: [
            { text: 'Calculate Age', action: 'calculateAge()', primary: true }
        ],
        outputType: 'custom',
        script: `
function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    const output = document.getElementById('output');
    
    if (!birthdateInput) {
        UniversalToast.error('Please enter your birth date');
        return;
    }
    
    const birthDate = new Date(birthdateInput);
    const today = new Date();
    
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
    
    output.innerHTML = \`
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
            <div class="stat-item">
                <span class="stat-label">Years</span>
                <span class="stat-value">\${years}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Months</span>
                <span class="stat-value">\${totalMonths}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Weeks</span>
                <span class="stat-value">\${totalWeeks.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Days</span>
                <span class="stat-value">\${totalDays.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Hours</span>
                <span class="stat-value">\${totalHours.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Minutes</span>
                <span class="stat-value">\${totalMinutes.toLocaleString()}</span>
            </div>
        </div>
        <p style="margin-top: 1.5rem; text-align: center; color: var(--text-secondary);">
            You are <strong>\${years} years, \${months} months, and \${days} days</strong> old
        </p>
    \`;
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
    }
};

// Generate HTML template
function generateToolHTML(toolId, config) {
    let inputsHTML = '';
    
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
            inputsHTML += `
                        <div class="input-group">
                            <label class="input-label">${input.label}</label>
                            <input type="${input.type}" id="${input.id}" 
                                ${input.placeholder ? `placeholder="${input.placeholder}"` : ''}
                                ${input.value ? `value="${input.value}"` : ''}
                                ${input.min ? `min="${input.min}"` : ''}
                                ${input.max ? `max="${input.max}"` : ''}>
                        </div>`;
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
