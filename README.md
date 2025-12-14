# ConvertHub - All-in-One Conversion Tools

A professional, fully client-side conversion website with 100+ tools for images, text, developer utilities, unit conversions, and more.

## 🚀 Features

### Image Converters
- JPG ↔ PNG ↔ WEBP conversions
- Image resizer, compressor, rotator, and flipper
- All processing done locally in your browser

### Text & Document Tools
- Text to Speech (browser TTS)
- Case converter (uppercase, lowercase, camelCase, snake_case, etc.)
- Word counter with detailed statistics
- Text reverser, Lorem Ipsum generator
- Markdown preview
- HTML entities encoder/decoder
- Remove duplicates and sort lines

### Developer Tools
- Base64 encoder/decoder
- URL encoder/decoder
- JSON formatter, minifier, and validator
- JSON ↔ CSV conversion
- Hash generator (SHA-1, SHA-256, SHA-384, SHA-512)
- UUID generator (v4)
- JWT decoder
- Color converter (HEX, RGB, HSL)
- Unix timestamp converter
- Regex tester
- CSS & JS minifier (basic)

### Unit Converters
- Length (m, km, cm, mm, mile, yard, foot, inch)
- Weight (kg, g, mg, ton, lb, oz)
- Temperature (°C, °F, K)
- Area, Volume, Speed, Time
- Data size (B, KB, MB, GB, TB)
- Pressure, Energy

### Utilities
- QR Code generator
- Password generator (customizable)
- Random number generator
- Color picker
- CSS gradient generator
- Countdown timer & Stopwatch
- Timezone converter
- Percentage calculator
- BMI calculator
- Age calculator

## 🔒 Privacy First

**All conversions happen locally in your browser. No files are uploaded to any server.**

- 100% client-side processing
- No data collection
- No tracking
- Works offline (after initial load)

## 🛠️ Tech Stack

- **Pure HTML5, CSS3, JavaScript** - No frameworks required
- **Web APIs**: Canvas API, Web Crypto API, Speech Synthesis API
- **External APIs** (optional): 
  - Google Charts API for QR code generation (can be replaced with local library)

## 📁 Project Structure

```
all_in_one/
├── index.html                      # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css              # All styles
│   └── js/
│       ├── tools-data.js          # Tool definitions and categories
│       ├── main.js                # Core app logic and UI
│       ├── converters.js          # Image and text converters
│       ├── converters-part2.js    # Developer tools and unit converters
│       └── converters-part3.js    # Utility tools
└── README.md                       # This file
```

## 🚀 Getting Started

### Option 1: Direct Open
Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local Server
For better performance and testing:

```powershell
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🌐 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 📝 Notes

### Limitations (by design - no server)
- **HEIC conversion**: Requires external library or API (not included)
- **Advanced image cropping**: Would require canvas manipulation library
- **PDF conversions**: Require server-side or heavy libraries
- **Audio/Video conversions**: Not possible in pure client-side
- **Advanced minification**: Basic minification only

### What Works Perfectly
- ✅ All image format conversions (JPG, PNG, WEBP)
- ✅ Image resize, compress, rotate, flip
- ✅ All text tools
- ✅ All developer tools (encoding, hashing, JSON, etc.)
- ✅ All unit converters
- ✅ All utilities

## 🎨 Customization

### Change Colors
Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #8b5cf6;    /* Secondary color */
    --success: #10b981;      /* Success messages */
    /* ... */
}
```

### Add New Tools
1. Add tool definition to `assets/js/tools-data.js`
2. Create template function in `converters.js`
3. Create initialization function
4. Map tool ID to functions in `initializeConverter()`

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and improve!

## 🔗 API Keys Notice

Currently, the QR Code generator uses Google Charts API which doesn't require an API key. If you want to use local QR code generation, consider adding the `qrcode.js` library.

## 📧 Support

For issues or questions, please check the code comments or create an issue.

---

**Built with ❤️ for the developer community**

Enjoy your all-in-one conversion tool! 🎉
