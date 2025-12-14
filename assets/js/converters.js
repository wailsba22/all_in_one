// Converter HTML templates and logic

function getConverterHTML(tool) {
    const converters = {
        // IMAGE CONVERTERS
        'jpg-to-png': imageConverterTemplate('JPG', 'PNG', 'image/jpeg', 'image/png'),
        'png-to-jpg': imageConverterTemplate('PNG', 'JPG', 'image/png', 'image/jpeg'),
        'webp-to-jpg': imageConverterTemplate('WEBP', 'JPG', 'image/webp', 'image/jpeg'),
        'webp-to-png': imageConverterTemplate('WEBP', 'PNG', 'image/webp', 'image/png'),
        'jpg-to-webp': imageConverterTemplate('JPG', 'WEBP', 'image/jpeg', 'image/webp'),
        'png-to-webp': imageConverterTemplate('PNG', 'WEBP', 'image/png', 'image/webp'),
        'heic-to-jpg': heicConverterTemplate(),
        'image-resize': imageResizerTemplate(),
        'image-compress': imageCompressorTemplate(),
        'image-crop': imageCropperTemplate(),
        'image-rotate': imageRotateTemplate(),
        'image-flip': imageFlipTemplate(),

        // TEXT TOOLS
        'text-to-speech': textToSpeechTemplate(),
        'case-converter': caseConverterTemplate(),
        'word-counter': wordCounterTemplate(),
        'text-reverser': textReverserTemplate(),
        'lorem-generator': loremGeneratorTemplate(),
        'markdown-preview': markdownPreviewTemplate(),
        'html-entities': htmlEntitiesTemplate(),
        'text-diff': textDiffTemplate(),
        'remove-duplicates': removeDuplicatesTemplate(),
        'sort-lines': sortLinesTemplate(),

        // DEVELOPER TOOLS
        'base64-encode': base64EncodeTemplate(),
        'base64-decode': base64DecodeTemplate(),
        'url-encode': urlEncodeTemplate(),
        'url-decode': urlDecodeTemplate(),
        'json-formatter': jsonFormatterTemplate(),
        'json-minify': jsonMinifyTemplate(),
        'json-to-csv': jsonToCsvTemplate(),
        'csv-to-json': csvToJsonTemplate(),
        'xml-formatter': xmlFormatterTemplate(),
        'hash-generator': hashGeneratorTemplate(),
        'uuid-generator': uuidGeneratorTemplate(),
        'jwt-decoder': jwtDecoderTemplate(),
        'color-converter': colorConverterTemplate(),
        'unix-timestamp': unixTimestampTemplate(),
        'regex-tester': regexTesterTemplate(),
        'css-minify': cssMinifyTemplate(),
        'js-minify': jsMinifyTemplate(),

        // UNIT CONVERTERS
        'length-converter': unitConverterTemplate('Length', lengthUnits),
        'weight-converter': unitConverterTemplate('Weight', weightUnits),
        'temperature-converter': temperatureConverterTemplate(),
        'area-converter': unitConverterTemplate('Area', areaUnits),
        'volume-converter': unitConverterTemplate('Volume', volumeUnits),
        'speed-converter': unitConverterTemplate('Speed', speedUnits),
        'time-converter': unitConverterTemplate('Time', timeUnits),
        'data-size-converter': unitConverterTemplate('Data Size', dataSizeUnits),
        'pressure-converter': unitConverterTemplate('Pressure', pressureUnits),
        'energy-converter': unitConverterTemplate('Energy', energyUnits),

        // UTILITIES
        'qr-generator': qrGeneratorTemplate(),
        'password-generator': passwordGeneratorTemplate(),
        'random-number': randomNumberTemplate(),
        'color-picker': colorPickerTemplate(),
        'gradient-generator': gradientGeneratorTemplate(),
        'lorem-ipsum': loremGeneratorTemplate(),
        'countdown-timer': countdownTimerTemplate(),
        'stopwatch': stopwatchTemplate(),
        'timezone-converter': timezoneConverterTemplate(),
        'percentage-calculator': percentageCalculatorTemplate(),
        'bmi-calculator': bmiCalculatorTemplate(),
        'age-calculator': ageCalculatorTemplate()
    };

    return converters[tool.id] || '<div class="converter-interface"><h2>Converter coming soon!</h2></div>';
}

// Initialize converter functionality
function initializeConverter(tool) {
    const handlers = {
        // Image handlers
        'jpg-to-png': () => initImageConverter('image/jpeg', 'image/png', 'png'),
        'png-to-jpg': () => initImageConverter('image/png', 'image/jpeg', 'jpg'),
        'webp-to-jpg': () => initImageConverter('image/webp', 'image/jpeg', 'jpg'),
        'webp-to-png': () => initImageConverter('image/webp', 'image/png', 'png'),
        'jpg-to-webp': () => initImageConverter('image/jpeg', 'image/webp', 'webp'),
        'png-to-webp': () => initImageConverter('image/png', 'image/webp', 'webp'),
        'image-resize': initImageResizer,
        'image-compress': initImageCompressor,
        'image-rotate': initImageRotator,
        'image-flip': initImageFlipper,

        // Text handlers
        'text-to-speech': initTextToSpeech,
        'case-converter': initCaseConverter,
        'word-counter': initWordCounter,
        'text-reverser': initTextReverser,
        'lorem-generator': initLoremGenerator,
        'markdown-preview': initMarkdownPreview,
        'html-entities': initHtmlEntities,
        'remove-duplicates': initRemoveDuplicates,
        'sort-lines': initSortLines,

        // Developer handlers
        'base64-encode': initBase64Encode,
        'base64-decode': initBase64Decode,
        'url-encode': initUrlEncode,
        'url-decode': initUrlDecode,
        'json-formatter': initJsonFormatter,
        'json-minify': initJsonMinify,
        'json-to-csv': initJsonToCsv,
        'csv-to-json': initCsvToJson,
        'hash-generator': initHashGenerator,
        'uuid-generator': initUuidGenerator,
        'jwt-decoder': initJwtDecoder,
        'color-converter': initColorConverter,
        'unix-timestamp': initUnixTimestamp,
        'regex-tester': initRegexTester,

        // Unit handlers
        'length-converter': () => initUnitConverter(lengthUnits),
        'weight-converter': () => initUnitConverter(weightUnits),
        'temperature-converter': initTemperatureConverter,
        'area-converter': () => initUnitConverter(areaUnits),
        'volume-converter': () => initUnitConverter(volumeUnits),
        'speed-converter': () => initUnitConverter(speedUnits),
        'time-converter': () => initUnitConverter(timeUnits),
        'data-size-converter': () => initUnitConverter(dataSizeUnits),

        // Utility handlers
        'qr-generator': initQrGenerator,
        'password-generator': initPasswordGenerator,
        'random-number': initRandomNumber,
        'color-picker': initColorPicker,
        'percentage-calculator': initPercentageCalculator,
        'bmi-calculator': initBmiCalculator,
        'age-calculator': initAgeCalculator
    };

    if (handlers[tool.id]) {
        handlers[tool.id]();
    }
}

// ========================================
// IMAGE CONVERTER TEMPLATES
// ========================================

function imageConverterTemplate(from, to, acceptType, outputType) {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Your files are processed locally in your browser. No uploads to any server. 100% private and secure.</span>
        </div>
        
        <div class="converter-section">
            <div class="file-upload" id="uploadArea">
                <i class="fas fa-cloud-upload-alt"></i>
                <p><strong>Select ${from} image</strong></p>
                <p class="small-text">or drag and drop it here</p>
                <input type="file" id="fileInput" accept="${acceptType}" multiple style="display: none;">
            </div>
        </div>
        
        <div id="previewArea" class="converter-section" style="display: none;">
            <div class="section-title">Preview & Download</div>
            <div id="imagePreview" class="result-box"></div>
            <div class="result-actions">
                <button class="download-btn" onclick="downloadAllConverted()">
                    <i class="fas fa-download"></i> Download All as ${to}
                </button>
            </div>
        </div>
    `;
}

function initImageConverter(inputMime, outputMime, outputExt) {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const imagePreview = document.getElementById('imagePreview');

    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        
        previewArea.classList.remove('hidden');
        imagePreview.innerHTML = '';
        
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const previewDiv = document.createElement('div');
                    previewDiv.style.marginBottom = '2rem';
                    previewDiv.innerHTML = `
                        <img src="${e.target.result}" class="preview-image" style="max-width: 100%; margin-bottom: 1rem;">
                        <button class="btn btn-success" onclick="downloadConvertedImage(this, '${outputExt}', ${index})">
                            <i class="fas fa-download"></i> Download ${outputExt.toUpperCase()}
                        </button>
                    `;
                    
                    canvas.toBlob((blob) => {
                        previewDiv.dataset.blob = URL.createObjectURL(blob);
                        imagePreview.appendChild(previewDiv);
                    }, outputMime, 0.92);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
    window.downloadConvertedImage = function(btn, ext, index) {
        const blob = btn.parentElement.dataset.blob;
        const a = document.createElement('a');
        a.href = blob;
        a.download = `converted_${index + 1}.${ext}`;
        a.click();
        showNotification('Image downloaded successfully!');
    };
}

function heicConverterTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>HEIC to JPG Converter</h2>
                <p><strong>Note:</strong> HEIC conversion requires external API. Not available in local mode.</p>
            </div>
        </div>
    `;
}

function imageResizerTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Resize images while maintaining quality. All processing happens locally in your browser.</span>
        </div>
        
        <div class="converter-section">
            <div class="file-upload" id="uploadArea">
                <i class="fas fa-images"></i>
                <p><strong>Select image to resize</strong></p>
                <p class="small-text">or drag and drop it here</p>
                <input type="file" id="fileInput" accept="image/*" style="display: none;">
            </div>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Dimensions</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label>Width (px)</label>
                    <input type="number" id="widthInput" placeholder="800" value="800">
                </div>
                <div>
                    <label>Height (px)</label>
                    <input type="number" id="heightInput" placeholder="600" value="600">
                </div>
            </div>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="checkbox" id="maintainRatio" checked style="width: auto;">
                <span>Maintain aspect ratio</span>
            </label>
        </div>
        
        <div class="button-group">
            <button id="resizeBtn">
                <i class="fas fa-compress-arrows-alt"></i> Resize Image
            </button>
        </div>
        
        <div id="previewArea" class="converter-section" style="display: none;">
            <div class="section-title">Result</div>
            <div id="imagePreview" class="result-box"></div>
        </div>
    `;
}

function initImageResizer() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const resizeBtn = document.getElementById('resizeBtn');
    const previewArea = document.getElementById('previewArea');
    const imagePreview = document.getElementById('imagePreview');
    let currentImage = null;

    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentImage = new Image();
                currentImage.src = event.target.result;
                showNotification('Image loaded! Set dimensions and click Resize.');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    resizeBtn.addEventListener('click', () => {
        if (!currentImage) {
            showNotification('Please upload an image first!', 'error');
            return;
        }

        const width = parseInt(document.getElementById('widthInput').value);
        const height = parseInt(document.getElementById('heightInput').value);
        
        if (!width || !height) {
            showNotification('Please enter valid dimensions!', 'error');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(currentImage, 0, 0, width, height);
        
        previewArea.classList.remove('hidden');
        imagePreview.innerHTML = `
            <img src="${canvas.toDataURL()}" class="preview-image">
            <button class="btn btn-success" style="margin-top: 1rem;" id="downloadBtn">
                <i class="fas fa-download"></i> Download Resized Image
            </button>
        `;
        
        document.getElementById('downloadBtn').addEventListener('click', () => {
            canvas.toBlob((blob) => {
                downloadFile(blob, 'resized-image.png');
                showNotification('Image downloaded!');
            });
        });
    });
}

function imageCompressorTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Image Compressor</h2>
                <p>Compress images to reduce file size</p>
            </div>
            <div class="converter-body">
                <div class="file-upload-area" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click or drag image here</p>
                    <input type="file" id="fileInput" accept="image/*">
                </div>
                <div class="form-group">
                    <label>Quality: <span id="qualityValue">80</span>%</label>
                    <input type="range" id="qualitySlider" min="1" max="100" value="80" style="width: 100%;">
                </div>
                <button class="btn btn-primary" id="compressBtn">
                    <i class="fas fa-compress-alt"></i> Compress Image
                </button>
                <div id="previewArea" class="output-area hidden">
                    <h3>Compressed Image</h3>
                    <div id="sizeInfo"></div>
                    <div id="imagePreview"></div>
                </div>
            </div>
        </div>
    `;
}

function initImageCompressor() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const compressBtn = document.getElementById('compressBtn');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const previewArea = document.getElementById('previewArea');
    const imagePreview = document.getElementById('imagePreview');
    const sizeInfo = document.getElementById('sizeInfo');
    let currentImage = null;
    let originalSize = 0;

    uploadArea.addEventListener('click', () => fileInput.click());
    
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value;
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            originalSize = file.size;
            const reader = new FileReader();
            reader.onload = (event) => {
                currentImage = new Image();
                currentImage.src = event.target.result;
                showNotification('Image loaded! Adjust quality and compress.');
            };
            reader.readAsDataURL(file);
        }
    });

    compressBtn.addEventListener('click', () => {
        if (!currentImage) {
            showNotification('Please upload an image first!', 'error');
            return;
        }

        const quality = qualitySlider.value / 100;
        const canvas = document.createElement('canvas');
        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(currentImage, 0, 0);
        
        canvas.toBlob((blob) => {
            const reduction = ((1 - blob.size / originalSize) * 100).toFixed(1);
            
            sizeInfo.innerHTML = `
                <p><strong>Original:</strong> ${(originalSize / 1024).toFixed(2)} KB</p>
                <p><strong>Compressed:</strong> ${(blob.size / 1024).toFixed(2)} KB</p>
                <p><strong>Reduction:</strong> ${reduction}%</p>
            `;
            
            previewArea.classList.remove('hidden');
            imagePreview.innerHTML = `
                <img src="${URL.createObjectURL(blob)}" class="preview-image">
                <button class="btn btn-success" style="margin-top: 1rem;" id="downloadBtn">
                    <i class="fas fa-download"></i> Download Compressed Image
                </button>
            `;
            
            document.getElementById('downloadBtn').addEventListener('click', () => {
                downloadFile(blob, 'compressed-image.jpg');
                showNotification('Image downloaded!');
            });
        }, 'image/jpeg', quality);
    });
}

function imageCropperTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Image Cropper</h2>
                <p>Feature coming soon! Requires interactive canvas implementation.</p>
            </div>
        </div>
    `;
}

function imageRotateTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Image Rotator</h2>
                <p>Rotate your images by any angle</p>
            </div>
            <div class="converter-body">
                <div class="file-upload-area" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click or drag image here</p>
                    <input type="file" id="fileInput" accept="image/*">
                </div>
                <div class="form-group">
                    <label>Rotation Angle: <span id="angleValue">0</span>°</label>
                    <input type="range" id="angleSlider" min="0" max="360" value="0" style="width: 100%;">
                </div>
                <div style="display: flex; gap: 1rem; margin: 1rem 0;">
                    <button class="btn btn-primary" id="rotate90">Rotate 90°</button>
                    <button class="btn btn-primary" id="rotate180">Rotate 180°</button>
                    <button class="btn btn-primary" id="rotate270">Rotate 270°</button>
                </div>
                <div id="previewArea" class="output-area hidden">
                    <h3>Rotated Image</h3>
                    <canvas id="canvas" style="max-width: 100%; border: 1px solid #ddd;"></canvas>
                    <button class="btn btn-success" style="margin-top: 1rem;" id="downloadBtn">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initImageRotator() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const angleSlider = document.getElementById('angleSlider');
    const angleValue = document.getElementById('angleValue');
    const previewArea = document.getElementById('previewArea');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');
    let currentImage = null;

    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentImage = new Image();
                currentImage.onload = () => {
                    previewArea.classList.remove('hidden');
                    rotateImage(0);
                };
                currentImage.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    angleSlider.addEventListener('input', (e) => {
        const angle = e.target.value;
        angleValue.textContent = angle;
        if (currentImage) rotateImage(angle);
    });

    document.getElementById('rotate90').addEventListener('click', () => setAngle(90));
    document.getElementById('rotate180').addEventListener('click', () => setAngle(180));
    document.getElementById('rotate270').addEventListener('click', () => setAngle(270));

    function setAngle(angle) {
        angleSlider.value = angle;
        angleValue.textContent = angle;
        if (currentImage) rotateImage(angle);
    }

    function rotateImage(angle) {
        const rad = angle * Math.PI / 180;
        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(currentImage, -currentImage.width / 2, -currentImage.height / 2);
        ctx.restore();
    }

    downloadBtn.addEventListener('click', () => {
        canvas.toBlob((blob) => {
            downloadFile(blob, 'rotated-image.png');
            showNotification('Image downloaded!');
        });
    });
}

function imageFlipTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Image Flipper</h2>
                <p>Flip images horizontally or vertically</p>
            </div>
            <div class="converter-body">
                <div class="file-upload-area" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click or drag image here</p>
                    <input type="file" id="fileInput" accept="image/*">
                </div>
                <div style="display: flex; gap: 1rem; margin: 1rem 0;">
                    <button class="btn btn-primary" id="flipH">
                        <i class="fas fa-arrows-alt-h"></i> Flip Horizontal
                    </button>
                    <button class="btn btn-primary" id="flipV">
                        <i class="fas fa-arrows-alt-v"></i> Flip Vertical
                    </button>
                </div>
                <div id="previewArea" class="output-area hidden">
                    <h3>Flipped Image</h3>
                    <canvas id="canvas" style="max-width: 100%; border: 1px solid #ddd;"></canvas>
                    <button class="btn btn-success" style="margin-top: 1rem;" id="downloadBtn">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initImageFlipper() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let currentImage = null;
    let flipH = false;
    let flipV = false;

    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentImage = new Image();
                currentImage.onload = () => {
                    previewArea.classList.remove('hidden');
                    drawImage();
                };
                currentImage.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    document.getElementById('flipH').addEventListener('click', () => {
        flipH = !flipH;
        drawImage();
    });

    document.getElementById('flipV').addEventListener('click', () => {
        flipV = !flipV;
        drawImage();
    });

    function drawImage() {
        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(currentImage, -currentImage.width / 2, -currentImage.height / 2);
        ctx.restore();
    }

    document.getElementById('downloadBtn').addEventListener('click', () => {
        canvas.toBlob((blob) => {
            downloadFile(blob, 'flipped-image.png');
            showNotification('Image downloaded!');
        });
    });
}

// ========================================
// TEXT & DOCUMENT TOOLS
// ========================================

function textToSpeechTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Text to Speech</h2>
                <p>Convert text to speech using browser TTS</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Enter Text</label>
                    <textarea id="textInput" placeholder="Type or paste text here..."></textarea>
                </div>
                <div class="form-group">
                    <label>Voice</label>
                    <select id="voiceSelect"></select>
                </div>
                <div class="form-group">
                    <label>Speed: <span id="rateValue">1</span>x</label>
                    <input type="range" id="rateSlider" min="0.5" max="2" step="0.1" value="1" style="width: 100%;">
                </div>
                <button class="btn btn-primary" id="speakBtn">
                    <i class="fas fa-play"></i> Speak
                </button>
                <button class="btn btn-danger" id="stopBtn" style="margin-left: 1rem;">
                    <i class="fas fa-stop"></i> Stop
                </button>
            </div>
        </div>
    `;
}

function initTextToSpeech() {
    const synth = window.speechSynthesis;
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const rateSlider = document.getElementById('rateSlider');
    const rateValue = document.getElementById('rateValue');
    const speakBtn = document.getElementById('speakBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    let voices = [];
    
    function loadVoices() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = voices.map((voice, index) => 
            `<option value="${index}">${voice.name} (${voice.lang})</option>`
        ).join('');
    }
    
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    
    rateSlider.addEventListener('input', (e) => {
        rateValue.textContent = e.target.value;
    });
    
    speakBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[voiceSelect.value];
        utterance.rate = parseFloat(rateSlider.value);
        synth.speak(utterance);
        showNotification('Speaking...');
    });
    
    stopBtn.addEventListener('click', () => {
        synth.cancel();
        showNotification('Stopped');
    });
}

function caseConverterTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Convert text between different case styles instantly.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Input Text</div>
            <textarea id="textInput" placeholder="Enter text to convert..."></textarea>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Choose Case Style</div>
            <div class="button-group" style="justify-content: flex-start;">
                <button class="secondary" data-case="upper">UPPERCASE</button>
                <button class="secondary" data-case="lower">lowercase</button>
                <button class="secondary" data-case="title">Title Case</button>
                <button class="secondary" data-case="sentence">Sentence case</button>
                <button class="secondary" data-case="camel">camelCase</button>
                <button class="secondary" data-case="snake">snake_case</button>
                <button class="secondary" data-case="kebab">kebab-case</button>
            </div>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Result</div>
            <div class="output-area" id="outputText"></div>
            <div class="result-actions">
                <button class="copy-btn" id="copyBtn">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initCaseConverter() {
    const textInput = document.getElementById('textInput');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    
    document.querySelectorAll('[data-case]').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = textInput.value;
            if (!text) {
                showNotification('Please enter some text!', 'error');
                return;
            }
            const caseType = btn.dataset.case;
            let result = '';
            
            switch(caseType) {
                case 'upper':
                    result = text.toUpperCase();
                    break;
                case 'lower':
                    result = text.toLowerCase();
                    break;
                case 'title':
                    result = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                    break;
                case 'sentence':
                    result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                    break;
                case 'camel':
                    result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
                    break;
                case 'snake':
                    result = text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                    break;
                case 'kebab':
                    result = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    break;
            }
            
            outputText.textContent = result;
            showNotification('Text converted to ' + caseType, 'success');
        });
    });
    
    copyBtn.addEventListener('click', () => {
        if (!outputText.textContent) return;
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function wordCounterTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Real-time word, character, line, and sentence counter.</span>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Enter Your Text</div>
            <textarea id="textInput" placeholder="Type or paste your text here..." style="min-height: 250px;"></textarea>
        </div>
        
        <div class="converter-section">
            <div class="section-title">Statistics</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
                <div style="text-align: center; padding: 1.5rem 1rem; background: #f0f7ff; border-radius: 10px; border: 2px solid #667eea;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #667eea;" id="wordCount">0</div>
                    <div style="color: #555; font-weight: 600; margin-top: 0.5rem;">Words</div>
                </div>
                <div style="text-align: center; padding: 1.5rem 1rem; background: #fef3f2; border-radius: 10px; border: 2px solid #f97316;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #f97316;" id="charCount">0</div>
                    <div style="color: #555; font-weight: 600; margin-top: 0.5rem;">Characters</div>
                </div>
                <div style="text-align: center; padding: 1.5rem 1rem; background: #f0fdf4; border-radius: 10px; border: 2px solid #22c55e;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #22c55e;" id="lineCount">0</div>
                    <div style="color: #555; font-weight: 600; margin-top: 0.5rem;">Lines</div>
                </div>
                <div style="text-align: center; padding: 1.5rem 1rem; background: #fffbeb; border-radius: 10px; border: 2px solid #eab308;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #eab308;" id="sentenceCount">0</div>
                    <div style="color: #555; font-weight: 600; margin-top: 0.5rem;">Sentences</div>
                </div>
            </div>
        </div>
    `;
}

function initWordCounter() {
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const lineCount = document.getElementById('lineCount');
    const sentenceCount = document.getElementById('sentenceCount');
    
    textInput.addEventListener('input', () => {
        const text = textInput.value;
        
        // Words
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        wordCount.textContent = words.length;
        
        // Characters
        charCount.textContent = text.length;
        
        // Lines
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        lineCount.textContent = lines.length;
        
        // Sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        sentenceCount.textContent = sentences.length;
    });
}

function textReverserTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Reverse entire text or just reverse the order of words
        </div>
        
        <div class="section-title">Input Text</div>
        <textarea id="textInput" placeholder="Enter text here..."></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="reverseText">
                <i class="fas fa-sync-alt"></i> Reverse Text
            </button>
            <button class="btn secondary" id="reverseWords">
                <i class="fas fa-random"></i> Reverse Words
            </button>
        </div>
        
        <div class="section-title">Result</div>
        <div class="output-area" id="outputText">Your reversed text will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initTextReverser() {
    const textInput = document.getElementById('textInput');
    const outputText = document.getElementById('outputText');
    
    document.getElementById('reverseText').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        outputText.textContent = text.split('').reverse().join('');
        showNotification('Text reversed!', 'success');
    });
    
    document.getElementById('reverseWords').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        outputText.textContent = text.split(' ').reverse().join(' ');
        showNotification('Words reversed!', 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        if (!outputText.textContent || outputText.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function loremGeneratorTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Generate Lorem Ipsum placeholder text for your designs and mockups
        </div>
        
        <div class="section-title">Number of Paragraphs</div>
        <input type="number" id="paraCount" value="3" min="1" max="50" style="width: 200px;">
        
        <div class="button-group">
            <button class="btn secondary" id="generateBtn">
                <i class="fas fa-magic"></i> Generate Lorem Ipsum
            </button>
        </div>
        
        <div class="section-title">Generated Text</div>
        <div class="output-area" id="outputText" style="min-height: 300px; white-space: pre-wrap;">Click generate to create Lorem Ipsum text...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initLoremGenerator() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    document.getElementById('generateBtn').addEventListener('click', () => {
        const count = parseInt(document.getElementById('paraCount').value);
        if (count < 1 || count > 50) {
            showNotification('Please enter a number between 1 and 50', 'error');
            return;
        }
        const paragraphs = Array(count).fill(lorem);
        document.getElementById('outputText').textContent = paragraphs.join('\n\n');
        showNotification(`Generated ${count} paragraph(s)`, 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('Click generate')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function markdownPreviewTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Markdown Preview</h2>
                <p>Preview Markdown as HTML (basic converter)</p>
            </div>
            <div class="converter-body">
                <div class="form-group">
                    <label>Markdown Input</label>
                    <textarea id="markdownInput" placeholder="# Hello World"></textarea>
                </div>
                <button class="btn btn-primary" id="previewBtn">
                    <i class="fas fa-eye"></i> Preview
                </button>
                <div class="output-area">
                    <h3>HTML Preview</h3>
                    <div id="preview" style="padding: 1rem; background: white; border-radius: 8px; min-height: 100px;"></div>
                </div>
            </div>
        </div>
    `;
}

function initMarkdownPreview() {
    document.getElementById('previewBtn').addEventListener('click', () => {
        const md = document.getElementById('markdownInput').value;
        const preview = document.getElementById('preview');
        
        // Basic markdown to HTML
        let html = md
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/\n/g, '<br>');
        
        preview.innerHTML = html;
    });
}

function htmlEntitiesTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Encode special characters to HTML entities or decode HTML entities to text
        </div>
        
        <div class="section-title">Input Text</div>
        <textarea id="textInput" placeholder="Enter text or HTML entities..."></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="encodeBtn">
                <i class="fas fa-lock"></i> Encode
            </button>
            <button class="btn secondary" id="decodeBtn">
                <i class="fas fa-unlock"></i> Decode
            </button>
        </div>
        
        <div class="section-title">Result</div>
        <div class="output-area" id="outputText">Your encoded/decoded text will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initHtmlEntities() {
    const textInput = document.getElementById('textInput');
    const outputText = document.getElementById('outputText');
    
    document.getElementById('encodeBtn').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        const div = document.createElement('div');
        div.textContent = text;
        outputText.textContent = div.innerHTML;
        showNotification('Text encoded to HTML entities', 'success');
    });
    
    document.getElementById('decodeBtn').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        const div = document.createElement('div');
        div.innerHTML = text;
        outputText.textContent = div.textContent;
        showNotification('HTML entities decoded', 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        if (!outputText.textContent || outputText.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function textDiffTemplate() {
    return `
        <div class="converter-interface">
            <div class="converter-header">
                <h2>Text Diff Checker</h2>
                <p>Compare two texts (basic comparison)</p>
            </div>
            <div class="converter-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label>Text 1</label>
                        <textarea id="text1"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Text 2</label>
                        <textarea id="text2"></textarea>
                    </div>
                </div>
                <button class="btn btn-primary" id="compareBtn">
                    <i class="fas fa-not-equal"></i> Compare
                </button>
                <div class="output-area">
                    <h3>Result</h3>
                    <div id="result"></div>
                </div>
            </div>
        </div>
    `;
}

function initTextDiff() {
    // Basic implementation - full diff library would be better
    showNotification('Basic text comparison only', 'warning');
}

function removeDuplicatesTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Remove duplicate lines from your text - each line will appear only once
        </div>
        
        <div class="section-title">Input Text (one item per line)</div>
        <textarea id="textInput" placeholder="Enter text with duplicate lines..."></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="removeBtn">
                <i class="fas fa-filter"></i> Remove Duplicates
            </button>
        </div>
        
        <div class="section-title">Result</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap;">Your deduplicated text will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initRemoveDuplicates() {
    document.getElementById('removeBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        const lines = text.split('\n');
        const unique = [...new Set(lines)];
        document.getElementById('outputText').textContent = unique.join('\n');
        showNotification(`Removed ${lines.length - unique.length} duplicate(s)`, 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const output = document.getElementById('outputText');
        if (!output.textContent || output.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(output.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

function sortLinesTemplate() {
    return `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            Sort your text lines alphabetically in ascending or descending order
        </div>
        
        <div class="section-title">Input Text (one item per line)</div>
        <textarea id="textInput" placeholder="Enter text to sort..."></textarea>
        
        <div class="button-group">
            <button class="btn secondary" id="sortAsc">
                <i class="fas fa-sort-alpha-down"></i> Sort A-Z
            </button>
            <button class="btn secondary" id="sortDesc">
                <i class="fas fa-sort-alpha-up"></i> Sort Z-A
            </button>
        </div>
        
        <div class="section-title">Result</div>
        <div class="output-area" id="outputText" style="white-space: pre-wrap;">Your sorted text will appear here...</div>
        
        <div class="result-actions">
            <button class="copy-btn" id="copyBtn">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
}

function initSortLines() {
    const textInput = document.getElementById('textInput');
    const outputText = document.getElementById('outputText');
    
    document.getElementById('sortAsc').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        const lines = text.split('\n');
        outputText.textContent = lines.sort().join('\n');
        showNotification('Sorted A-Z', 'success');
    });
    
    document.getElementById('sortDesc').addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            showNotification('Please enter some text!', 'error');
            return;
        }
        const lines = text.split('\n');
        outputText.textContent = lines.sort().reverse().join('\n');
        showNotification('Sorted Z-A', 'success');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        if (!outputText.textContent || outputText.textContent.includes('will appear here')) return;
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    });
}

// Continue in next file part...
