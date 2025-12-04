# Debug Guide - Black Screen Issue

## Quick Checks

1. **Open Browser Console (F12)**
   - Look for RED error messages
   - Copy and share any errors you see

2. **Check if React is Loading**
   - In Console, type: `document.getElementById('root')`
   - Should return: `<div id="root">...</div>`
   - If it returns `null`, there's an HTML issue

3. **Check Network Tab**
   - Look for failed requests (red items)
   - Check if main.tsx or App.tsx failed to load

## Common Issues

- **Module not found**: Check imports
- **Three.js error**: Three.js might be failing
- **CSS not loading**: Check if styles are applied
- **JavaScript error**: Check console for stack traces

## Test Steps

1. Refresh page: Ctrl+F5 (hard refresh)
2. Check console: F12 → Console tab
3. Share any error messages

