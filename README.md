# Temu Global Products Only

**English** | [Türkçe](README.tr.md)

A browser extension that shows only global products on Temu, hiding local warehouse products.

This extension doesn't just hide products visually; it filters them at the API level. Your searches are processed on the server to return only global products.

## 🚀 Installation

### For Chrome

1. Download or clone this repository
2. Go to `chrome://extensions/` in Chrome
3. Enable **Developer mode** in the top right corner
4. Click **Load unpacked**
5. Select the downloaded folder

### For Firefox

1. Download or clone this repository
2. Go to `about:debugging#/runtime/this-firefox` in Firefox
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` file from the downloaded folder

**Note:** In Firefox, the extension will be loaded temporarily. You'll need to reload it each time you restart the browser. For permanent use, the extension needs to be signed by Mozilla. I'll work on this soon.

## 💻 Usage

1. After installing, you'll see the extension icon in the top right corner of your browser
2. Click the icon to open the extension
3. Use the toggle switch to enable or disable the filter
4. After changing the setting, Temu pages will automatically reload

## 🔧 How It Works

The extension intercepts Temu's API requests and modifies the `semiManaged` parameter to `false`. This way:

- ❌ Local warehouse products are filtered out
- ✅ Only global products are shown

## 📝 Technical Details

### File Structure

```
temu-global-products-only/
├── manifest.json      # Extension configuration
├── content.js         # Intercepts API requests
├── popup.html         # Popup UI
├── popup.css          # Popup styles
├── popup.js           # Popup logic
├── _locales/          # Multi-language support
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
└── README.md          # This file
```

### API Interception

The extension uses the `XMLHttpRequest` API to intercept and modify requests to Temu's `/api/poppy/v1/search` endpoint:

```javascript
// Set semiManaged parameter to false
data.semiManaged = false;
```

## 🌍 Multi-Language Support

The extension automatically detects your browser language:
- 🇬🇧 English
- 🇹🇷 Turkish

## 📄 License

MIT License - Feel free to use it.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚠️ Disclaimer

This is an UNOFFICIAL extension and is NOT affiliated with, endorsed by, 
or connected to Temu in any way. This extension is provided for educational 
and personal use only. Use at your own risk.

By using this extension, you acknowledge that:
- It may violate Temu's Terms of Service
- Temu may block or restrict your account
- The developers are not responsible for any consequences
