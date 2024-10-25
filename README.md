# SunoCookieCopy

SunoCookieCopy is a Chrome extension designed to intercept and copy authentication cookies from the Suno.com website. This tool is particularly useful for developers and testers who need to work with Suno's API or debug authentication issues.

## Features

- Automatically intercepts authentication cookies from Suno.com
- Provides a simple user interface to copy the intercepted cookie
- Displays the current intercepted cookie value
- Works seamlessly in the background

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. After installation, you'll see the SunoCookieCopy icon in your Chrome toolbar.
2. Visit https://suno.com and log in to your account.
3. Click on the SunoCookieCopy icon to open the popup.
4. Click the "Copy Cookie Value" button to copy the intercepted cookie to your clipboard.
5. The copied cookie can now be used for API requests or debugging purposes.

## How it Works

The extension uses Chrome's declarativeNetRequest API to intercept requests to Suno's authentication endpoint. When a matching request is detected, the extension captures the cookies and stores them locally. The popup interface allows users to easily copy these intercepted cookies.

## Files Overview

- `manifest.json`: Defines the extension's permissions and structure.
- `background.js`: Contains the logic for intercepting and storing cookies.
- `popup.html` and `popup.js`: Provide the user interface for copying cookies.

## Development

To modify or extend this extension:

1. Make changes to the relevant files (`background.js`, `popup.js`, `popup.html`).
2. Reload the extension in `chrome://extensions/` by clicking the refresh icon.
3. Test your changes by interacting with the Suno.com website and the extension popup.

## Privacy Note

This extension is designed for personal development use. Be cautious when handling authentication cookies, and never share them with unauthorized parties.

## License

[MIT License](LICENSE)
