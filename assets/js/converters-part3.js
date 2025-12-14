// Utilities (Part 3)

// ========================================
// UTILITY TOOLS
// ========================================

function qrGeneratorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>QR Code Generator</h2>
                <p>Generate QR codes from text or URLs</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Text or URL</label>
                    <textarea id="textInput" placeholder="Enter text or URL..."></textarea>
                </div>
                <button class="btn btn-primary" id="generateBtn">
                    <i class="fas fa-qrcode"></i> Generate QR Code
                </button>
                <div class="output-area">
                    <h3>QR Code</h3>
                    <div id="qrcode" style="text-align: center; padding: 2rem;"></div>
                    <p style="text-align: center; color: var(--gray);">
                        <em>Note: Using Google Charts API for QR generation</em>
                    </p>
                </div>
            </div>
        </div>
    `;
}

function initQrGenerator() {
    document.getElementById('generateBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        if (!text) {
            showNotification('Please enter text or URL', 'error');
            return;
        }
        
        const qrDiv = document.getElementById('qrcode');
        const size = 300;
        const url = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(text)}`;
        
        qrDiv.innerHTML = `
            <img src="${url}" alt="QR Code" style="max-width: 100%; border: 1px solid #ddd; padding: 1rem; background: white;">
            <br>
            <a href="${url}" download="qrcode.png" class="btn btn-success" style="margin-top: 1rem;">
                <i class="fas fa-download"></i> Download QR Code
            </a>
        `;
        
        showNotification('QR Code generated!');
    });
}

function passwordGeneratorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Password Generator</h2>
                <p>Generate secure random passwords</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Length: <span id="lengthValue">16</span></label>
                    <input type="range" id="lengthSlider" min="8" max="64" value="16" style="width: 100%;">
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="uppercase" checked> Uppercase (A-Z)</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="lowercase" checked> Lowercase (a-z)</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="numbers" checked> Numbers (0-9)</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="symbols" checked> Symbols (!@#$%)</label>
                </div>
                <button class="btn btn-primary" id="generateBtn">
                    <i class="fas fa-key"></i> Generate Password
                </button>
                <div class="output-area">
                    <h3>Generated Password</h3>
                    <input type="text" id="passwordOutput" readonly style="font-family: monospace; font-size: 1.2rem; text-align: center;">
                    <button class="btn btn-success" id="copyBtn" style="margin-top: 1rem;">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initPasswordGenerator() {
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generateBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    
    lengthSlider.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });
    
    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const useUppercase = document.getElementById('uppercase').checked;
        const useLowercase = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;
        
        let chars = '';
        if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) chars += '0123456789';
        if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (chars === '') {
            showNotification('Please select at least one character type', 'error');
            return;
        }
        
        let password = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += chars[array[i] % chars.length];
        }
        
        passwordOutput.value = password;
        showNotification('Password generated!');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        passwordOutput.select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard!');
    });
    
    // Generate on load
    generateBtn.click();
}

function randomNumberTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Random Number Generator</h2>
                <p>Generate random numbers</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Minimum Value</label>
                    <input type="number" id="minValue" value="1">
                </div>
                <div class="form-group">
                    <label>Maximum Value</label>
                    <input type="number" id="maxValue" value="100">
                </div>
                <div class="form-group">
                    <label>How many numbers?</label>
                    <input type="number" id="countValue" value="1" min="1" max="100">
                </div>
                <button class="btn btn-primary" id="generateBtn">
                    <i class="fas fa-dice"></i> Generate
                </button>
                <div class="output-area">
                    <h3>Random Numbers</h3>
                    <div id="results" style="font-size: 2rem; font-weight: bold; text-align: center; padding: 2rem; background: white; border-radius: 8px;"></div>
                </div>
            </div>
        </div>
    `;
}

function initRandomNumber() {
    document.getElementById('generateBtn').addEventListener('click', () => {
        const min = parseInt(document.getElementById('minValue').value);
        const max = parseInt(document.getElementById('maxValue').value);
        const count = parseInt(document.getElementById('countValue').value);
        
        if (min >= max) {
            showNotification('Minimum must be less than maximum', 'error');
            return;
        }
        
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        
        document.getElementById('results').textContent = numbers.join(', ');
    });
}

function colorPickerTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Color Picker</h2>
                <p>Pick colors and get color codes</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Pick a Color</label>
                    <input type="color" id="colorInput" value="#6366f1" style="width: 100%; height: 100px; cursor: pointer;">
                </div>
                <div class="output-area">
                    <h3>Color Codes</h3>
                    <div id="colorInfo"></div>
                </div>
            </div>
        </div>
    `;
}

function initColorPicker() {
    const colorInput = document.getElementById('colorInput');
    const colorInfo = document.getElementById('colorInfo');
    
    function updateColorInfo() {
        const hex = colorInput.value;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        colorInfo.innerHTML = `
            <div style="background: ${hex}; height: 100px; border-radius: 8px; margin-bottom: 1rem;"></div>
            <p><strong>HEX:</strong> ${hex.toUpperCase()}</p>
            <p><strong>RGB:</strong> rgb(${r}, ${g}, ${b})</p>
            <p><strong>RGB Values:</strong> R: ${r}, G: ${g}, B: ${b}</p>
        `;
    }
    
    colorInput.addEventListener('input', updateColorInfo);
    updateColorInfo();
}

function gradientGeneratorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>CSS Gradient Generator</h2>
                <p>Create CSS gradients visually</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Color 1</label>
                    <input type="color" id="color1" value="#6366f1">
                </div>
                <div class="form-group">
                    <label>Color 2</label>
                    <input type="color" id="color2" value="#8b5cf6">
                </div>
                <div class="form-group">
                    <label>Direction</label>
                    <select id="direction">
                        <option value="to right">Left to Right</option>
                        <option value="to left">Right to Left</option>
                        <option value="to bottom">Top to Bottom</option>
                        <option value="to top">Bottom to Top</option>
                        <option value="135deg" selected>Diagonal</option>
                    </select>
                </div>
                <button class="btn btn-primary" id="generateBtn">
                    <i class="fas fa-fill-drip"></i> Generate
                </button>
                <div class="output-area">
                    <h3>Preview</h3>
                    <div id="preview" style="height: 150px; border-radius: 8px;"></div>
                    <h3 style="margin-top: 1rem;">CSS Code</h3>
                    <textarea id="cssCode" readonly></textarea>
                    <button class="btn btn-success" id="copyBtn" style="margin-top: 1rem;">
                        <i class="fas fa-copy"></i> Copy CSS
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initGradientGenerator() {
    function generate() {
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;
        const direction = document.getElementById('direction').value;
        
        const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;
        document.getElementById('preview').style.background = gradient;
        document.getElementById('cssCode').value = `background: ${gradient};`;
    }
    
    document.getElementById('generateBtn').addEventListener('click', generate);
    document.getElementById('color1').addEventListener('input', generate);
    document.getElementById('color2').addEventListener('input', generate);
    document.getElementById('direction').addEventListener('change', generate);
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const code = document.getElementById('cssCode');
        code.select();
        document.execCommand('copy');
        showNotification('CSS copied to clipboard!');
    });
    
    generate();
}

function countdownTimerTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Countdown Timer</h2>
                <p>Set a countdown timer</p>
            </div>
            <div class="converter-body">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <div class="form-group">
                        <label>Hours</label>
                        <input type="number" id="hours" value="0" min="0">
                    </div>
                    <div class="form-group">
                        <label>Minutes</label>
                        <input type="number" id="minutes" value="5" min="0" max="59">
                    </div>
                    <div class="form-group">
                        <label>Seconds</label>
                        <input type="number" id="seconds" value="0" min="0" max="59">
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin: 1rem 0;">
                    <button class="btn btn-primary" id="startBtn">
                        <i class="fas fa-play"></i> Start
                    </button>
                    <button class="btn btn-danger" id="stopBtn">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                    <button class="btn btn-primary" id="resetBtn">
                        <i class="fas fa-redo"></i> Reset
                    </button>
                </div>
                <div class="output-area">
                    <div id="display" style="font-size: 4rem; font-weight: bold; text-align: center; font-family: monospace;">00:00:00</div>
                </div>
            </div>
        </div>
    `;
}

function initCountdownTimer() {
    let interval = null;
    let remainingSeconds = 0;
    
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    function updateDisplay() {
        const hrs = Math.floor(remainingSeconds / 3600);
        const mins = Math.floor((remainingSeconds % 3600) / 60);
        const secs = remainingSeconds % 60;
        display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    startBtn.addEventListener('click', () => {
        if (interval) return;
        
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        
        if (remainingSeconds === 0) {
            remainingSeconds = hours * 3600 + minutes * 60 + seconds;
        }
        
        if (remainingSeconds <= 0) {
            showNotification('Please set a time greater than 0', 'error');
            return;
        }
        
        interval = setInterval(() => {
            remainingSeconds--;
            updateDisplay();
            
            if (remainingSeconds <= 0) {
                clearInterval(interval);
                interval = null;
                showNotification('Time\'s up!', 'success');
                // Play sound if possible
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYJGmi56+NNSA==');
                audio.play().catch(() => {});
            }
        }, 1000);
        
        showNotification('Timer started!');
    });
    
    stopBtn.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            showNotification('Timer stopped');
        }
    });
    
    resetBtn.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        remainingSeconds = 0;
        updateDisplay();
        showNotification('Timer reset');
    });
    
    updateDisplay();
}

function stopwatchTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Stopwatch</h2>
                <p>Simple stopwatch timer</p>
            </div>
            <div class="converter-body">
                <div class="output-area">
                    <div id="display" style="font-size: 4rem; font-weight: bold; text-align: center; font-family: monospace;">00:00:00</div>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; margin: 2rem 0;">
                    <button class="btn btn-primary" id="startBtn">
                        <i class="fas fa-play"></i> Start
                    </button>
                    <button class="btn btn-danger" id="stopBtn">
                        <i class="fas fa-pause"></i> Pause
                    </button>
                    <button class="btn btn-primary" id="resetBtn">
                        <i class="fas fa-redo"></i> Reset
                    </button>
                </div>
            </div>
        </div>
    `;
}

function timezoneConverterTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Timezone Converter</h2>
                <p>Convert times between timezones</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Date & Time</label>
                    <input type="datetime-local" id="datetimeInput">
                </div>
                <button class="btn btn-primary" id="convertBtn">
                    <i class="fas fa-globe"></i> Show in All Timezones
                </button>
                <div class="output-area">
                    <h3>Common Timezones</h3>
                    <div id="results"></div>
                </div>
            </div>
        </div>
    `;
}

function initTimezoneConverter() {
    // Set current time
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now - offset).toISOString().slice(0, 16);
    document.getElementById('datetimeInput').value = localTime;
    
    document.getElementById('convertBtn').addEventListener('click', () => {
        const datetime = new Date(document.getElementById('datetimeInput').value);
        
        const timezones = {
            'UTC': 'UTC',
            'EST (New York)': 'America/New_York',
            'PST (Los Angeles)': 'America/Los_Angeles',
            'GMT (London)': 'Europe/London',
            'CET (Paris)': 'Europe/Paris',
            'JST (Tokyo)': 'Asia/Tokyo',
            'AEST (Sydney)': 'Australia/Sydney'
        };
        
        let html = '<div style="display: grid; gap: 1rem;">';
        for (const [name, tz] of Object.entries(timezones)) {
            const timeString = datetime.toLocaleString('en-US', { timeZone: tz, hour12: false });
            html += `<p><strong>${name}:</strong> ${timeString}</p>`;
        }
        html += '</div>';
        
        document.getElementById('results').innerHTML = html;
    });
}

function percentageCalculatorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Percentage Calculator</h2>
                <p>Calculate percentages</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>What is <input type="number" id="percent" style="width: 80px; display: inline;"> % of <input type="number" id="number" style="width: 100px; display: inline;"> ?</label>
                    <button class="btn btn-primary" id="calcBtn1" style="margin-top: 0.5rem;">Calculate</button>
                    <p id="result1" style="margin-top: 0.5rem; font-weight: bold;"></p>
                </div>
                <hr>
                <div class="form-group">
                    <label><input type="number" id="num1" style="width: 100px; display: inline;"> is what % of <input type="number" id="num2" style="width: 100px; display: inline;"> ?</label>
                    <button class="btn btn-primary" id="calcBtn2" style="margin-top: 0.5rem;">Calculate</button>
                    <p id="result2" style="margin-top: 0.5rem; font-weight: bold;"></p>
                </div>
                <hr>
                <div class="form-group">
                    <label>Percentage change from <input type="number" id="old" style="width: 100px; display: inline;"> to <input type="number" id="new" style="width: 100px; display: inline;"></label>
                    <button class="btn btn-primary" id="calcBtn3" style="margin-top: 0.5rem;">Calculate</button>
                    <p id="result3" style="margin-top: 0.5rem; font-weight: bold;"></p>
                </div>
            </div>
        </div>
    `;
}

function initPercentageCalculator() {
    document.getElementById('calcBtn1').addEventListener('click', () => {
        const percent = parseFloat(document.getElementById('percent').value);
        const number = parseFloat(document.getElementById('number').value);
        const result = (percent / 100) * number;
        document.getElementById('result1').textContent = `Result: ${result.toFixed(2)}`;
    });
    
    document.getElementById('calcBtn2').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const result = (num1 / num2) * 100;
        document.getElementById('result2').textContent = `Result: ${result.toFixed(2)}%`;
    });
    
    document.getElementById('calcBtn3').addEventListener('click', () => {
        const oldVal = parseFloat(document.getElementById('old').value);
        const newVal = parseFloat(document.getElementById('new').value);
        const result = ((newVal - oldVal) / oldVal) * 100;
        document.getElementById('result3').textContent = `Change: ${result > 0 ? '+' : ''}${result.toFixed(2)}%`;
    });
}

function bmiCalculatorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>BMI Calculator</h2>
                <p>Calculate your Body Mass Index</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1">
                </div>
                <div class="form-group">
                    <label>Height (cm)</label>
                    <input type="number" id="height" placeholder="175" step="0.1">
                </div>
                <button class="btn btn-primary" id="calculateBtn">
                    <i class="fas fa-calculator"></i> Calculate BMI
                </button>
                <div class="output-area">
                    <h3>Your BMI</h3>
                    <div id="bmiResult" style="font-size: 3rem; font-weight: bold; text-align: center;"></div>
                    <div id="bmiCategory" style="text-align: center; font-size: 1.2rem; margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
    `;
}

function initBmiCalculator() {
    document.getElementById('calculateBtn').addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
        
        if (!weight || !height) {
            showNotification('Please enter both weight and height', 'error');
            return;
        }
        
        const bmi = weight / (height * height);
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
        
        document.getElementById('bmiResult').textContent = bmi.toFixed(1);
        document.getElementById('bmiResult').style.color = color;
        document.getElementById('bmiCategory').innerHTML = `<strong style="color: ${color};">${category}</strong>`;
    });
}

function ageCalculatorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Age Calculator</h2>
                <p>Calculate your exact age</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Date of Birth</label>
                    <input type="date" id="birthdate">
                </div>
                <button class="btn btn-primary" id="calculateBtn">
                    <i class="fas fa-birthday-cake"></i> Calculate Age
                </button>
                <div class="output-area">
                    <h3>Your Age</h3>
                    <div id="ageResult"></div>
                </div>
            </div>
        </div>
    `;
}

function initAgeCalculator() {
    document.getElementById('calculateBtn').addEventListener('click', () => {
        const birthdate = new Date(document.getElementById('birthdate').value);
        const today = new Date();
        
        if (!document.getElementById('birthdate').value) {
            showNotification('Please select your birth date', 'error');
            return;
        }
        
        let years = today.getFullYear() - birthdate.getFullYear();
        let months = today.getMonth() - birthdate.getMonth();
        let days = today.getDate() - birthdate.getDate();
        
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
        const totalMonths = years * 12 + months;
        
        document.getElementById('ageResult').innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; font-weight: bold; color: var(--primary);">${years}</div>
                <div style="font-size: 1.2rem; margin-bottom: 2rem;">Years Old</div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${years}</div>
                        <div>Years</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${months}</div>
                        <div>Months</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${days}</div>
                        <div>Days</div>
                    </div>
                </div>
                <hr style="margin: 2rem 0;">
                <p><strong>Total:</strong> ${totalMonths} months or ${totalDays} days</p>
            </div>
        `;
    });
}
