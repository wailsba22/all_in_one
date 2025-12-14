// Developer Tools, Unit Converters, and Utilities (Part 2)

// ========================================
// DEVELOPER TOOLS
// ========================================

function base64EncodeTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Base64 encoding converts text into ASCII string format. Commonly used for data transmission.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Input Text</div>
            <textarea id="textInput" placeholder="Enter text to encode..."></textarea>
        </div>
        
        <div class="button-group">
            <button id="convertBtn">
                <i class="fas fa-lock"></i> Encode to Base64
            </button>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Base64 Result</div>
            <div class="output-area" id="outputText"></div>
            <div class="result-actions">
                <button class="copy-btn" id="copyBtn">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initBase64Encode() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        const output = document.getElementById('outputText');
        if (!text) {
            output.textContent = '';
            return;
        }
        output.textContent = btoa(unescape(encodeURIComponent(text)));
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function base64DecodeTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Base64 decoding converts encoded ASCII string back to original text.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Base64 Input</div>
            <textarea id="textInput" placeholder="Paste Base64 string to decode..."></textarea>
        </div>
        
        <div class="button-group">
            <button id="convertBtn">
                <i class="fas fa-unlock"></i> Decode from Base64
            </button>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Decoded Text</div>
            <div class="output-area" id="outputText"></div>
            <div class="result-actions">
                <button class="copy-btn" id="copyBtn">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initBase64Decode() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        try {
            const text = document.getElementById('textInput').value;
            const output = document.getElementById('outputText');
            if (!text) {
                output.textContent = '';
                return;
            }
            output.textContent = decodeURIComponent(escape(atob(text)));
        } catch(e) {
            showNotification('Invalid Base64 string!', 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function urlEncodeTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>URL encoding converts special characters for safe transmission in URLs.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Text to Encode</div>
            <textarea id="textInput" placeholder="Enter text to URL encode..."></textarea>
        </div>
        
        <div class="button-group">
            <button id="convertBtn">
                <i class="fas fa-link"></i> Encode for URL
            </button>
        </div>
        
        <div class="converter-section">
            <div class="section-title">URL Encoded Result</div>
            <div class="output-area" id="outputText"></div>
            <div class="result-actions">
                <button class="copy-btn" id="copyBtn">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initUrlEncode() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        const output = document.getElementById('outputText');
        if (!text) {
            output.textContent = '';
            return;
        }
        output.textContent = encodeURIComponent(text);
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function urlDecodeTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>URL decoding converts percent-encoded characters back to original text.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">URL Encoded Input</div>
            <textarea id="textInput" placeholder="Paste URL encoded text to decode..."></textarea>
        </div>
        
        <div class="button-group">
            <button id="convertBtn">
                <i class="fas fa-link"></i> Decode URL
            </button>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Decoded Text</div>
            <div class="output-area" id="outputText"></div>
            <div class="result-actions">
                <button class="copy-btn" id="copyBtn">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initUrlDecode() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        try {
            const text = document.getElementById('textInput').value;
            const output = document.getElementById('outputText');
            if (!text) {
                output.textContent = '';
                return;
            }
            output.textContent = decodeURIComponent(text);
        } catch(e) {
            showNotification('Invalid URL encoded string!', 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function jsonFormatterTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Format and beautify JSON with proper indentation for better readability
        </div>
        
        <div class="section-title">JSON Input</div>
        <textarea id="jsonInput" placeholder='{"key": "value"}' style="font-family: 'Courier New', monospace;"></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="formatBtn">
                <i class="fas fa-indent"></i> Format
            </button>
            <button class="btn secondary" id="validateBtn">
                <i class="fas fa-check"></i> Validate Only
            </button>
        </div>
        
        <div class="section-title">Formatted JSON</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap; font-family: 'Courier New', monospace;">Formatted JSON will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initJsonFormatter() {
    const jsonInput = document.getElementById('jsonInput');
    const outputText = document.getElementById('outputText');
    
    document.getElementById('formatBtn').addEventListener('click', () => {
        try {
            const text = jsonInput.value;
            if (!text) {
                showNotification('Please enter some JSON!', 'error');
                return;
            }
            const json = JSON.parse(text);
            outputText.textContent = JSON.stringify(json, null, 2);
            showNotification('JSON formatted successfully!', 'success');
        } catch(e) {
            showNotification('Invalid JSON: ' + e.message, 'error');
        }
    });
    
    document.getElementById('validateBtn').addEventListener('click', () => {
        try {
            const text = jsonInput.value;
            if (!text) {
                showNotification('Please enter some JSON!', 'error');
                return;
            }
            JSON.parse(text);
            showNotification('✓ Valid JSON!', 'success');
        } catch(e) {
            showNotification('Invalid JSON: ' + e.message, 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        if (!outputText.textContent || outputText.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function jsonMinifyTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Minify JSON by removing whitespace and newlines to reduce file size
        </div>
        
        <div class="section-title">JSON Input</div>
        <textarea id="jsonInput" placeholder='{"key": "value"}' style="font-family: 'Courier New', monospace;"></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="minifyBtn">
                <i class="fas fa-compress"></i> Minify JSON
            </button>
        </div>
        
        <div class="section-title">Minified JSON</div>
        <div class="output-area" id="outputText" style="font-family: 'Courier New', monospace; word-break: break-all;">Minified JSON will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initJsonMinify() {
    document.getElementById('minifyBtn').addEventListener('click', () => {
        try {
            const text = document.getElementById('jsonInput').value;
            if (!text) {
                showNotification('Please enter some JSON!', 'error');
                return;
            }
            const json = JSON.parse(text);
            const minified = JSON.stringify(json);
            document.getElementById('outputText').textContent = minified;
            showNotification('JSON minified successfully!', 'success');
        } catch(e) {
            showNotification('Invalid JSON: ' + e.message, 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function jsonToCsvTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Convert JSON array of objects to CSV format for spreadsheet applications
        </div>
        
        <div class="section-title">JSON Input (Array of Objects)</div>
        <textarea id="jsonInput" placeholder='[{"name":"John","age":30}]' style="font-family: 'Courier New', monospace;"></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="convertBtn">
                <i class="fas fa-table"></i> Convert to CSV
            </button>
        </div>
        
        <div class="section-title">CSV Output</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap; font-family: 'Courier New', monospace;">CSV output will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
            <button class="download-btn" id="downloadBtn">
                <i class="fas fa-download"></i> Download CSV
            </button>
        </div>
    `;
}

function initJsonToCsv() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        try {
            const text = document.getElementById('jsonInput').value;
            if (!text) {
                showNotification('Please enter some JSON!', 'error');
                return;
            }
            const json = JSON.parse(text);
            if (!Array.isArray(json) || json.length === 0) {
                showNotification('Please provide a non-empty JSON array', 'error');
                return;
            }
            
            const keys = Object.keys(json[0]);
            const csv = [
                keys.join(','),
                ...json.map(row => keys.map(k => JSON.stringify(row[k] || '')).join(','))
            ].join('\n');
            
            document.getElementById('outputText').textContent = csv;
            showNotification('Converted to CSV!', 'success');
        } catch(e) {
            showNotification('Invalid JSON: ' + e.message, 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
    
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const csv = document.getElementById('outputText').textContent;
        if (!csv || csv.includes('will appear here')) return;
        const blob = new Blob([csv], { type: 'text/csv' });
        downloadFile(blob, 'data.csv');
    });
}

function csvToJsonTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Convert CSV data to JSON array format - first row should contain column headers
        </div>
        
        <div class="section-title">CSV Input</div>
        <textarea id="csvInput" placeholder="name,age\nJohn,30\nJane,25" style="font-family: 'Courier New', monospace;"></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="convertBtn">
                <i class="fas fa-brackets-curly"></i> Convert to JSON
            </button>
        </div>
        
        <div class="section-title">JSON Output</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap; font-family: 'Courier New', monospace;">JSON output will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initCsvToJson() {
    document.getElementById('convertBtn').addEventListener('click', () => {
        try {
            const csv = document.getElementById('csvInput').value;
            if (!csv) {
                showNotification('Please enter some CSV data!', 'error');
                return;
            }
            const lines = csv.split('\n').filter(l => l.trim());
            if (lines.length < 2) {
                showNotification('CSV must have at least a header row and one data row', 'error');
                return;
            }
            const headers = lines[0].split(',').map(h => h.trim());
            const json = lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header] = values[i]?.trim() || '';
                    return obj;
                }, {});
            });
            
            document.getElementById('outputText').textContent = JSON.stringify(json, null, 2);
            showNotification('Converted to JSON!', 'success');
        } catch(e) {
            showNotification('Error: ' + e.message, 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function xmlFormatterTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Format and beautify XML with proper indentation (basic formatter)
        </div>
        
        <div class="section-title">XML Input</div>
        <textarea id="xmlInput" placeholder="<root><item>value</item></root>" style="font-family: 'Courier New', monospace;"></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="formatBtn">
                <i class="fas fa-indent"></i> Format XML
            </button>
        </div>
        
        <div class="section-title">Formatted XML</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap; font-family: 'Courier New', monospace;">Formatted XML will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function hashGeneratorTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Generate cryptographic hashes using Web Crypto API (SHA-1, SHA-256, SHA-384, SHA-512)
        </div>
        
        <div class="section-title">Input Text</div>
        <textarea id="textInput" placeholder="Enter text to hash..."></textarea>
        
        <div class="section-title">Algorithm</div>
        <select id="algorithmSelect" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; width: 200px;">
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256" selected>SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
        </select>
        
        <div class="button-group">
            <button class="btn secondary" id="generateBtn">
                <i class="fas fa-hashtag"></i> Generate Hash
            </button>
        </div>
        
        <div class="section-title">Hash Result</div>
        <div class="output-area" id="outputText" style="font-family: 'Courier New', monospace; word-break: break-all;">Hash will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initHashGenerator() {
    document.getElementById('generateBtn').addEventListener('click', async () => {
        const text = document.getElementById('textInput').value;
        const algorithm = document.getElementById('algorithmSelect').value;
        
        if (!text) {
            showNotification('Please enter text to hash', 'error');
            return;
        }
        
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            document.getElementById('outputText').textContent = hashHex;
            showNotification(`${algorithm} hash generated!`, 'success');
        } catch(e) {
            showNotification('Error generating hash: ' + e.message, 'error');
        }
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function uuidGeneratorTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Generate random universally unique identifiers (UUIDs v4)
        </div>
        
        <div class="section-title">Number of UUIDs</div>
        <input type="number" id="countInput" value="5" min="1" max="100" style="width: 200px;">
        
        <div class="button-group">
            <button class="btn secondary" id="generateBtn">
                <i class="fas fa-fingerprint"></i> Generate UUIDs
            </button>
        </div>
        
        <div class="section-title">Generated UUIDs</div>
        <div class="output-area" id="outputText" style="min-height: 200px; white-space: pre-wrap; font-family: 'Courier New', monospace;">UUIDs will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy All
            </button>
        </div>
    `;
}

function initUuidGenerator() {
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    document.getElementById('generateBtn').addEventListener('click', () => {
        const count = parseInt(document.getElementById('countInput').value);
        if (count < 1 || count > 100) {
            showNotification('Please enter a number between 1 and 100', 'error');
            return;
        }
        const uuids = Array.from({length: count}, () => generateUUID());
        document.getElementById('outputText').textContent = uuids.join('\n');
        showNotification(`Generated ${count} UUID${count > 1 ? 's' : ''}!`, 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function jwtDecoderTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>JWT Decoder</h2>
                <p>Decode JWT tokens (header and payload only, no verification)</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>JWT Token</label>
                    <textarea id="jwtInput" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
                </div>
                <button class="btn btn-primary" id="decodeBtn">
                    <i class="fas fa-key"></i> Decode
                </button>
                <div class="output-area">
                    <h3>Decoded JWT</h3>
                    <div id="outputText"></div>
                </div>
            </div>
        </div>
    `;
}

function initJwtDecoder() {
    document.getElementById('decodeBtn').addEventListener('click', () => {
        try {
            const jwt = document.getElementById('jwtInput').value.trim();
            const parts = jwt.split('.');
            
            if (parts.length !== 3) {
                showNotification('Invalid JWT format', 'error');
                return;
            }
            
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            
            document.getElementById('outputText').innerHTML = `
                <h4>Header</h4>
                <pre style="background: white; padding: 1rem; border-radius: 8px;">${JSON.stringify(header, null, 2)}</pre>
                <h4>Payload</h4>
                <pre style="background: white; padding: 1rem; border-radius: 8px;">${JSON.stringify(payload, null, 2)}</pre>
            `;
            showNotification('JWT decoded!');
        } catch(e) {
            showNotification('Invalid JWT: ' + e.message, 'error');
        }
    });
}

function colorConverterTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Color Converter</h2>
                <p>Convert between HEX, RGB, and HSL</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>HEX Color</label>
                    <input type="text" id="hexInput" placeholder="#FF5733" value="#FF5733">
                </div>
                <button class="btn btn-primary" id="convertBtn">
                    <i class="fas fa-palette"></i> Convert
                </button>
                <div class="output-area">
                    <div class="color-preview" id="colorPreview"></div>
                    <div id="results" style="margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
    `;
}

function initColorConverter() {
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
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
    
    document.getElementById('convertBtn').addEventListener('click', () => {
        const hex = document.getElementById('hexInput').value;
        const rgb = hexToRgb(hex);
        
        if (!rgb) {
            showNotification('Invalid HEX color', 'error');
            return;
        }
        
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        document.getElementById('colorPreview').style.background = hex;
        document.getElementById('results').innerHTML = `
            <p><strong>HEX:</strong> ${hex}</p>
            <p><strong>RGB:</strong> rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</p>
            <p><strong>HSL:</strong> hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</p>
        `;
    });
    
    // Auto convert on load
    document.getElementById('convertBtn').click();
}

function unixTimestampTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Unix Timestamp Converter</h2>
                <p>Convert between Unix timestamp and date</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Unix Timestamp (seconds)</label>
                    <input type="number" id="timestampInput" placeholder="1234567890">
                    <button class="btn btn-primary" id="nowBtn" style="margin-top: 0.5rem;">Use Current Time</button>
                </div>
                <button class="btn btn-primary" id="convertBtn">
                    <i class="fas fa-clock"></i> Convert to Date
                </button>
                <div class="output-area">
                    <h3>Result</h3>
                    <div id="results"></div>
                </div>
            </div>
        </div>
    `;
}

function initUnixTimestamp() {
    document.getElementById('nowBtn').addEventListener('click', () => {
        document.getElementById('timestampInput').value = Math.floor(Date.now() / 1000);
    });
    
    document.getElementById('convertBtn').addEventListener('click', () => {
        const timestamp = document.getElementById('timestampInput').value;
        const date = new Date(timestamp * 1000);
        
        document.getElementById('results').innerHTML = `
            <p><strong>UTC:</strong> ${date.toUTCString()}</p>
            <p><strong>Local:</strong> ${date.toLocaleString()}</p>
            <p><strong>ISO:</strong> ${date.toISOString()}</p>
        `;
    });
}

function regexTesterTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Regex Tester</h2>
                <p>Test regular expressions</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Regular Expression</label>
                    <input type="text" id="regexInput" placeholder="\\d+">
                </div>
                <div class="form-group">
                    <label>Flags</label>
                    <input type="text" id="flagsInput" placeholder="gi" value="g">
                </div>
                <div class="form-group">
                    <label>Test String</label>
                    <textarea id="testInput" placeholder="Enter text to test against regex..."></textarea>
                </div>
                <button class="btn btn-primary" id="testBtn">
                    <i class="fas fa-search"></i> Test
                </button>
                <div class="output-area">
                    <h3>Matches</h3>
                    <div id="results"></div>
                </div>
            </div>
        </div>
    `;
}

function initRegexTester() {
    document.getElementById('testBtn').addEventListener('click', () => {
        try {
            const pattern = document.getElementById('regexInput').value;
            const flags = document.getElementById('flagsInput').value;
            const text = document.getElementById('testInput').value;
            
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex);
            
            if (matches) {
                document.getElementById('results').innerHTML = `
                    <p><strong>Found ${matches.length} match(es):</strong></p>
                    <ul>${matches.map(m => `<li>${m}</li>`).join('')}</ul>
                `;
            } else {
                document.getElementById('results').innerHTML = '<p>No matches found</p>';
            }
        } catch(e) {
            showNotification('Invalid regex: ' + e.message, 'error');
        }
    });
}

function cssMinifyTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>CSS Minifier</h2>
                <p>Minify CSS code (basic)</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>CSS Input</label>
                    <textarea id="cssInput" placeholder="body { margin: 0; padding: 0; }"></textarea>
                </div>
                <button class="btn btn-primary" id="minifyBtn">
                    <i class="fas fa-compress"></i> Minify
                </button>
                <div class="output-area">
                    <h3>Minified CSS</h3>
                    <textarea id="outputText" readonly></textarea>
                    <button class="btn btn-success" id="copyBtn" style="margin-top: 1rem;">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        </div>
    `;
}

function jsMinifyTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>JavaScript Minifier</h2>
                <p>Minify JavaScript code (basic - removes comments and whitespace)</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>JavaScript Input</label>
                    <textarea id="jsInput" placeholder="function hello() { console.log('Hi'); }"></textarea>
                </div>
                <button class="btn btn-primary" id="minifyBtn">
                    <i class="fas fa-compress"></i> Minify
                </button>
                <div class="output-area">
                    <h3>Minified JavaScript</h3>
                    <textarea id="outputText" readonly></textarea>
                    <button class="btn btn-success" id="copyBtn" style="margin-top: 1rem;">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// UNIT CONVERTERS
// ========================================

const lengthUnits = {
    'm': 1,
    'km': 0.001,
    'cm': 100,
    'mm': 1000,
    'mile': 0.000621371,
    'yard': 1.09361,
    'foot': 3.28084,
    'inch': 39.3701
};

const weightUnits = {
    'kg': 1,
    'g': 1000,
    'mg': 1000000,
    'ton': 0.001,
    'lb': 2.20462,
    'oz': 35.274
};

const areaUnits = {
    'm²': 1,
    'km²': 0.000001,
    'cm²': 10000,
    'ft²': 10.7639,
    'acre': 0.000247105,
    'hectare': 0.0001
};

const volumeUnits = {
    'L': 1,
    'mL': 1000,
    'gal': 0.264172,
    'qt': 1.05669,
    'pt': 2.11338,
    'cup': 4.22675,
    'm³': 0.001
};

const speedUnits = {
    'km/h': 1,
    'm/s': 0.277778,
    'mph': 0.621371,
    'knot': 0.539957
};

const timeUnits = {
    's': 1,
    'min': 0.0166667,
    'h': 0.000277778,
    'day': 0.0000115741,
    'week': 0.00000165344,
    'month': 3.8052e-7,
    'year': 3.171e-8
};

const dataSizeUnits = {
    'B': 1,
    'KB': 0.001,
    'MB': 0.000001,
    'GB': 1e-9,
    'TB': 1e-12,
    'KiB': 0.0009765625,
    'MiB': 9.5367431640625e-7,
    'GiB': 9.31322574615479e-10
};

const pressureUnits = {
    'Pa': 1,
    'kPa': 0.001,
    'bar': 0.00001,
    'psi': 0.000145038,
    'atm': 9.8692e-6
};

const energyUnits = {
    'J': 1,
    'kJ': 0.001,
    'cal': 0.239006,
    'kcal': 0.000239006,
    'Wh': 0.000277778,
    'kWh': 2.7778e-7
};

function unitConverterTemplate(name, units) {
    const unitOptions = Object.keys(units).map(u => `<option value="${u}">${u}</option>`).join('');
    
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>${name} Converter</h2>
                <p>Convert between different ${name.toLowerCase()} units</p>
            </div>
            <div class="converter-body">
                <div class="unit-converter-grid">
                    <div class="form-group">
                        <label>From</label>
                        <input type="number" id="fromValue" placeholder="0" value="1">
                        <select id="fromUnit">${unitOptions}</select>
                    </div>
                    <div class="form-group">
                        <label>To</label>
                        <input type="number" id="toValue" placeholder="0" readonly>
                        <select id="toUnit">${unitOptions}</select>
                    </div>
                </div>
                <button class="btn btn-primary" id="convertBtn" style="margin-top: 1rem;">
                    <i class="fas fa-exchange-alt"></i> Convert
                </button>
            </div>
        </div>
    `;
}

function initUnitConverter(units) {
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    const convertBtn = document.getElementById('convertBtn');
    
    // Select different units by default
    const unitKeys = Object.keys(units);
    if (unitKeys.length > 1) {
        toUnit.value = unitKeys[1];
    }
    
    function convert() {
        const value = parseFloat(fromValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (isNaN(value)) {
            toValue.value = '';
            return;
        }
        
        // Convert to base unit, then to target unit
        const baseValue = value / units[from];
        const result = baseValue * units[to];
        
        toValue.value = result.toFixed(6);
    }
    
    convertBtn.addEventListener('click', convert);
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    
    // Convert on load
    convert();
}

function temperatureConverterTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Temperature Converter</h2>
                <p>Convert between Celsius, Fahrenheit, and Kelvin</p>
            </div>
            <div class="converter-body">
                <div class="unit-converter-grid">
                    <div class="form-group">
                        <label>From</label>
                        <input type="number" id="fromValue" placeholder="0" value="0">
                        <select id="fromUnit">
                            <option value="C">Celsius (°C)</option>
                            <option value="F">Fahrenheit (°F)</option>
                            <option value="K">Kelvin (K)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>To</label>
                        <input type="number" id="toValue" placeholder="0" readonly>
                        <select id="toUnit">
                            <option value="C">Celsius (°C)</option>
                            <option value="F" selected>Fahrenheit (°F)</option>
                            <option value="K">Kelvin (K)</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" id="convertBtn" style="margin-top: 1rem;">
                    <i class="fas fa-exchange-alt"></i> Convert
                </button>
            </div>
        </div>
    `;
}

function initTemperatureConverter() {
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    
    function convert() {
        const value = parseFloat(fromValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (isNaN(value)) {
            toValue.value = '';
            return;
        }
        
        // Convert to Celsius first
        let celsius;
        switch(from) {
            case 'C': celsius = value; break;
            case 'F': celsius = (value - 32) * 5/9; break;
            case 'K': celsius = value - 273.15; break;
        }
        
        // Convert from Celsius to target
        let result;
        switch(to) {
            case 'C': result = celsius; break;
            case 'F': result = celsius * 9/5 + 32; break;
            case 'K': result = celsius + 273.15; break;
        }
        
        toValue.value = result.toFixed(2);
    }
    
    document.getElementById('convertBtn').addEventListener('click', convert);
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    
    convert();
}

// Continue with utilities in next part...
