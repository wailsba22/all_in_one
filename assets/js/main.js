// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderTools();
    renderNavDropdowns();
    setupSearch();
    setupModal();
    setupMobileMenu();
    setupSmoothScroll();
}

// Tool icon mapping
const toolIcons = {
    // Image Tools
    'jpg-to-png': 'https://cdn-icons-png.flaticon.com/128/3767/3767084.png',
    'png-to-jpg': 'https://cdn-icons-png.flaticon.com/128/3767/3767094.png',
    'jpg-to-webp': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
    'webp-to-jpg': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
    'png-to-webp': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
    'webp-to-png': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
    'heic-to-jpg': 'https://cdn-icons-png.flaticon.com/128/3767/3767084.png',
    'image-resize': 'https://cdn-icons-png.flaticon.com/128/3603/3603047.png',
    'image-crop': 'https://cdn-icons-png.flaticon.com/128/2721/2721715.png',
    'image-rotate': 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
    'image-flip': 'https://cdn-icons-png.flaticon.com/128/2721/2721736.png',
    'image-compress': 'https://cdn-icons-png.flaticon.com/128/2721/2721666.png',
    
    // Text Tools
    'text-to-speech': 'https://cdn-icons-png.flaticon.com/128/3524/3524636.png',
    'case-converter': 'https://cdn-icons-png.flaticon.com/128/2721/2721791.png',
    'word-counter': 'https://cdn-icons-png.flaticon.com/128/3179/3179068.png',
    'text-reverser': 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
    'lorem-generator': 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png',
    'markdown-preview': 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png',
    'html-entities': 'https://cdn-icons-png.flaticon.com/128/1051/1051277.png',
    'text-diff': 'https://cdn-icons-png.flaticon.com/128/4185/4185287.png',
    'remove-duplicates': 'https://cdn-icons-png.flaticon.com/128/3524/3524335.png',
    'sort-lines': 'https://cdn-icons-png.flaticon.com/128/2721/2721791.png',
    
    // Developer Tools
    'base64-encode': 'https://cdn-icons-png.flaticon.com/128/1304/1304061.png',
    'base64-decode': 'https://cdn-icons-png.flaticon.com/128/1304/1304046.png',
    'url-encode': 'https://cdn-icons-png.flaticon.com/128/3524/3524335.png',
    'url-decode': 'https://cdn-icons-png.flaticon.com/128/3524/3524344.png',
    'json-formatter': 'https://cdn-icons-png.flaticon.com/128/136/136525.png',
    'json-minify': 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png',
    'json-to-csv': 'https://cdn-icons-png.flaticon.com/128/6133/6133884.png',
    'csv-to-json': 'https://cdn-icons-png.flaticon.com/128/6133/6133884.png',
    'xml-formatter': 'https://cdn-icons-png.flaticon.com/128/136/136526.png',
    'css-minify': 'https://cdn-icons-png.flaticon.com/128/732/732190.png',
    'js-minify': 'https://cdn-icons-png.flaticon.com/128/5968/5968292.png',
    'regex-tester': 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
    'jwt-decoder': 'https://cdn-icons-png.flaticon.com/128/2620/2620288.png',
    'hash-generator': 'https://cdn-icons-png.flaticon.com/128/4185/4185082.png',
    'uuid-generator': 'https://cdn-icons-png.flaticon.com/128/2920/2920354.png',
    'color-converter': 'https://cdn-icons-png.flaticon.com/128/2972/2972531.png',
    'unix-timestamp': 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png',
    
    // Unit Converters
    'length-converter': 'https://cdn-icons-png.flaticon.com/128/3179/3179231.png',
    'weight-converter': 'https://cdn-icons-png.flaticon.com/128/2920/2920230.png',
    'temperature-converter': 'https://cdn-icons-png.flaticon.com/128/1684/1684350.png',
    'speed-converter': 'https://cdn-icons-png.flaticon.com/128/3179/3179073.png',
    'area-converter': 'https://cdn-icons-png.flaticon.com/128/3179/3179234.png',
    'volume-converter': 'https://cdn-icons-png.flaticon.com/128/3050/3050155.png',
    'time-converter': 'https://cdn-icons-png.flaticon.com/128/2972/2972528.png',
    'data-size-converter': 'https://cdn-icons-png.flaticon.com/128/2920/2920262.png',
    'pressure-converter': 'https://cdn-icons-png.flaticon.com/128/3524/3524335.png',
    'energy-converter': 'https://cdn-icons-png.flaticon.com/128/3524/3524636.png',
    
    // Utilities
    'qr-generator': 'https://cdn-icons-png.flaticon.com/128/714/714361.png',
    'password-generator': 'https://cdn-icons-png.flaticon.com/128/2889/2889676.png',
    'random-number': 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png',
    'color-picker': 'https://cdn-icons-png.flaticon.com/128/2972/2972531.png',
    'gradient-generator': 'https://cdn-icons-png.flaticon.com/128/3524/3524636.png',
    'lorem-ipsum': 'https://cdn-icons-png.flaticon.com/128/2965/2965358.png',
    'countdown-timer': 'https://cdn-icons-png.flaticon.com/128/2972/2972530.png',
    'stopwatch': 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png',
    'timezone-converter': 'https://cdn-icons-png.flaticon.com/128/3135/3135706.png',
    'percentage-calculator': 'https://cdn-icons-png.flaticon.com/128/3179/3179158.png',
    'bmi-calculator': 'https://cdn-icons-png.flaticon.com/128/2920/2920230.png',
    'age-calculator': 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png',
    
    // Document/Office Tools
    'pdf-merger': 'https://cdn-icons-png.flaticon.com/128/337/337946.png',
    'pdf-splitter': 'https://cdn-icons-png.flaticon.com/128/3342/3342197.png',
    'pdf-compressor': 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png',
    'word-to-pdf': 'https://cdn-icons-png.flaticon.com/128/281/281760.png',
    'excel-to-pdf': 'https://cdn-icons-png.flaticon.com/128/888/888850.png',
    'powerpoint-to-pdf': 'https://cdn-icons-png.flaticon.com/128/888/888874.png',
    'excel-to-csv': 'https://cdn-icons-png.flaticon.com/128/6133/6133884.png',
    'word-counter-doc': 'https://cdn-icons-png.flaticon.com/128/3179/3179068.png'
};

// Render tools in navigation dropdowns
function renderNavDropdowns() {
    const categories = [
        { id: 'image', tools: toolsData.image },
        { id: 'text', tools: toolsData.text },
        { id: 'dev', tools: toolsData.dev },
        { id: 'unit', tools: toolsData.units },
        { id: 'utility', tools: toolsData.utilities },
        { id: 'document', tools: toolsData.document }
    ];
    
    categories.forEach(category => {
        const container = document.getElementById(`nav-${category.id}-tools`);
        if (container && category.tools) {
            container.innerHTML = '';
            category.tools.forEach(tool => {
                const item = document.createElement('a');
                // Check if we're in a tool page (has /tools/ in path) or index page
                const isToolPage = window.location.pathname.includes('/tools/');
                item.href = isToolPage ? `${tool.id}.html` : `tools/${tool.id}.html`;
                item.className = 'dropdown-item';
                const iconUrl = toolIcons[tool.id] || 'https://cdn-icons-png.flaticon.com/128/3524/3524335.png';
                item.innerHTML = `
                    <img src="${iconUrl}" alt="${tool.name}" onerror="this.src='https://cdn-icons-png.flaticon.com/128/3524/3524335.png'">
                    <div class="dropdown-item-content">
                        <div class="dropdown-item-title">${tool.name}</div>
                        <div class="dropdown-item-desc">${tool.description}</div>
                    </div>
                `;
                container.appendChild(item);
            });
        }
    });
}

// Render all tool cards
function renderTools() {
    // Render popular tools only
    const popularContainer = document.getElementById('popularTools');
    if (popularContainer) {
        toolsData.popular.forEach(tool => {
            popularContainer.appendChild(createToolCard(tool, true));
        });
    }
}

// Create tool card element
function createToolCard(tool, isPopular = false) {
    const card = document.createElement('div');
    card.className = `tool-card ${isPopular ? 'popular' : ''}`;
    
    // Get tool-specific icon image
    const iconMap = {
        'jpg-to-png': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
        'png-to-jpg': 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
        'base64-encode': 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png',
        'base64-decode': 'https://cdn-icons-png.flaticon.com/128/2920/2920277.png',
        'json-formatter': 'https://cdn-icons-png.flaticon.com/128/136/136525.png',
        'qr-generator': 'https://cdn-icons-png.flaticon.com/128/714/714361.png',
        'password-generator': 'https://cdn-icons-png.flaticon.com/128/2889/2889676.png',
        'hash-generator': 'https://cdn-icons-png.flaticon.com/128/4185/4185082.png'
    };
    
    const iconUrl = iconMap[tool.id];
    const iconHTML = iconUrl 
        ? `<img src="${iconUrl}" alt="${tool.name}" style="width: 48px; height: 48px; margin-bottom: 1rem; object-fit: contain;">` 
        : `<i class="fas ${tool.icon}"></i>`;
    
    card.innerHTML = `
        ${iconHTML}
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
    `;
    card.addEventListener('click', () => openConverter(tool));
    return card;
}

// Open converter in full page
function openConverter(tool) {
    const page = document.getElementById('converterPage');
    const container = document.getElementById('converterContainer');
    
    // Load the appropriate converter interface
    container.innerHTML = getConverterHTML(tool);
    
    // Show full page
    page.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll to top
    page.scrollTop = 0;
    
    // Initialize converter functionality
    initializeConverter(tool);
}

// Close converter page
function setupModal() {
    const page = document.getElementById('converterPage');
    const backBtn = document.getElementById('backButton');
    
    backBtn.addEventListener('click', () => {
        page.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && page.classList.contains('active')) {
            page.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}



// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        // Show/hide tool cards based on search
        document.querySelectorAll('.tool-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.flexDirection = 'column';
        nav.style.padding = '1rem';
        nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Download helper
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
