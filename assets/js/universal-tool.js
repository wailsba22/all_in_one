// Universal Tool JavaScript Framework

// Toast Notification System
const UniversalToast = {
    show: function(message, type = 'success', duration = 3000) {
        const toast = document.getElementById('universalToast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },
    
    success: function(message) {
        this.show(message, 'success');
    },
    
    error: function(message) {
        this.show(message, 'error');
    }
};

// Copy to Clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            UniversalToast.success('Copied to clipboard!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        UniversalToast.success('Copied to clipboard!');
    } catch (err) {
        UniversalToast.error('Failed to copy');
    }
    document.body.removeChild(textarea);
}

// Copy from Element
function copyFromElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.value || element.textContent;
    copyToClipboard(text);
}

// Clear Element
function clearElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
        element.value = '';
    } else {
        element.textContent = '';
    }
    element.focus();
}

// File Upload Handler
class UniversalFileUpload {
    constructor(zoneId, options = {}) {
        this.zone = document.getElementById(zoneId);
        this.input = options.inputId ? document.getElementById(options.inputId) : this.createInput();
        this.accept = options.accept || '*';
        this.multiple = options.multiple || false;
        this.onFileSelect = options.onFileSelect || null;
        
        this.init();
    }
    
    createInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.accept = this.accept;
        input.multiple = this.multiple;
        document.body.appendChild(input);
        return input;
    }
    
    init() {
        if (!this.zone) return;
        
        // Click to upload
        this.zone.addEventListener('click', () => {
            this.input.click();
        });
        
        // Drag and drop
        this.zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.zone.classList.add('dragover');
        });
        
        this.zone.addEventListener('dragleave', () => {
            this.zone.classList.remove('dragover');
        });
        
        this.zone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.zone.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });
        
        // File input change
        this.input.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });
    }
    
    handleFiles(files) {
        if (this.onFileSelect) {
            this.onFileSelect(files);
        }
    }
}

// Image Preview Handler
function createImagePreview(file, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        container.innerHTML = `<img src="${e.target.result}" class="image-preview" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

// Download File
function downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    UniversalToast.success('File downloaded!');
}

// Download Image
function downloadImage(canvas, filename = 'image.png') {
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        UniversalToast.success('Image downloaded!');
    });
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading Spinner
const LoadingSpinner = {
    show: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '<div class="spinner"></div>';
    },
    
    hide: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add toast container if it doesn't exist
    if (!document.getElementById('universalToast')) {
        const toast = document.createElement('div');
        toast.id = 'universalToast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
});
