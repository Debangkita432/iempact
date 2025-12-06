# Troubleshooting Black Screen

## Immediate Steps:

1. **Open Browser Developer Tools**
   - Press `F12` or `Right-click → Inspect`
   - Go to **Console** tab
   - Look for RED error messages
   - **Copy and share any errors**

2. **Hard Refresh**
   - Windows: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

3. **Check Network Tab**
   - In Developer Tools, go to **Network** tab
   - Refresh the page
   - Look for failed requests (shown in red)
   - Check if any `.js` or `.tsx` files failed to load

## What to Look For:

- **Module not found errors**: Missing dependencies
- **Syntax errors**: Code issues
- **Three.js errors**: WebGL/Three.js problems
- **Import errors**: Wrong file paths

## Quick Fix - Test Simple Version:

If the page is completely black, React might not be mounting. Check the console for errors first!

