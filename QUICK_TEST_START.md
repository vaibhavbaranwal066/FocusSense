# 🧪 Quick Test Guide - FocusSense

## The Fastest Way to Test (2 minutes)

### Option 1: Browser Console Automated Tests (Recommended)

1. **Open the app in Chrome/Firefox**
   ```
   Open index.html in browser
   ```

2. **Open DevTools**
   ```
   Press F12 (Windows) or Cmd+Option+I (Mac)
   ```

3. **Go to Console tab**
   ```
   Click "Console" in DevTools
   ```

4. **Run tests**
   ```
   Type: runAllTests()
   Press Enter
   ```

5. **See results**
   - ✅ Green = PASS
   - ❌ Red = FAIL
   - Shows score at bottom (e.g., "95% PASS")

### Tests That Run Automatically
✓ DOM structure validation  
✓ localStorage persistence  
✓ Activity tracking  
✓ Theme system  
✓ Navigation  
✓ Charts & SVGs  
✓ Performance metrics  
✓ Responsive design  
✓ Accessibility  

---

## Option 2: Chrome DevTools Performance Testing

### Monitor 60 FPS (Is it smooth?)

1. **Open DevTools → Performance tab**
2. **Click red record button**
3. **Interact with app** (scroll, navigate, animate charts)
4. **Stop recording**
5. **Check FPS chart** (top right)

✓ **PASS**: Mostly green line at 60 FPS  
✗ **FAIL**: Red/orange drops and stutters  

### Monitor CPU Usage (Is it efficient?)

1. **Press Escape in DevTools**
2. **Press Escape again**
3. **Three dots menu → Performance Monitor**
4. **Watch CPU % while app is idle**

✓ **PASS**: CPU < 1%  
✗ **FAIL**: CPU constantly > 5%  

### Monitor Memory (Any leaks?)

1. **Open DevTools → Memory tab**
2. **Click "Take heap snapshot"**
3. **Interact with app for 30 seconds**
4. **Take another snapshot**
5. **Compare sizes**

✓ **PASS**: Stable, not growing  
✗ **FAIL**: Memory constantly increasing  

---

## Option 3: Lighthouse Audit (Is it production-ready?)

1. **Open DevTools → Lighthouse tab**
2. **Select "Desktop" (or "Mobile")**
3. **Click "Analyze page load"**
4. **Wait 30-60 seconds**

View scores:
- **95+**: Performance (EXCELLENT)
- **90+**: Accessibility (GOOD)
- **100**: Best Practices (EXCELLENT)
- **100**: SEO (EXCELLENT)

---

## Option 4: Manual Testing Checklist (5 minutes)

### Core Functionality
- [ ] App loads in < 1 second
- [ ] Dashboard shows focus score
- [ ] Activity tracking works (move mouse, type)
- [ ] Focus score updates in real-time
- [ ] Dark theme works
- [ ] Light theme works

### Navigation
- [ ] Click Dashboard → loads instantly
- [ ] Click Analytics → shows filters
- [ ] Click Insights → shows insights
- [ ] Click Goals → shows goals

### Mobile (F12 → Device Toggle)
- [ ] 320px: Drawer menu shows
- [ ] 480px: Responsive layout works
- [ ] 768px: Desktop layout shows
- [ ] No horizontal scrolling

### Performance
- [ ] Charts animate smoothly (60 FPS)
- [ ] No console errors (F12 Console tab)
- [ ] No lag when scrolling
- [ ] No visual glitches

---

## Quick Diagnostic Function

In browser console, run:
```javascript
quickDiagnostic()
```

Shows:
- Theme setting
- Viewport size
- Device type
- Activity data size
- localStorage contents

---

## Running Specific Tests

You can also run individual tests in console:

```javascript
// Test specific areas
testDOM()                  // Check HTML structure
testLocalStorage()         // Check data persistence
testActivityTracking()     // Check tracking
testTheme()               // Check dark/light mode
testNavigation()          // Check links work
testCharts()              // Check visualizations
testPerformance()         // Check speed
testResponsive()          // Check mobile layout
testAccessibility()       // Check accessibility
```

---

## What to Look For in Passing Tests

### DOM Tests ✓
- Main layout container exists
- Sidebar navigation present
- Navbar header visible
- Content area exists
- Theme toggle button visible

### Activity Tracking ✓
- Focus score between 0-10
- Activity array recording events
- Daily reset working
- localStorage < 500KB

### Performance ✓
- Page load < 1 second
- Animations 60 FPS constant
- CPU idle < 1%
- Memory < 50MB

### Responsive ✓
- Layout adapts at 320px, 480px, 768px
- No horizontal scrolling
- Touch targets 44px minimum
- Charts resize correctly

---

## If Tests Fail

### Problem: "focussense-tracking not found"
**Solution**: 
- Interact with app (click, type) to create data
- Try again after 1 second

### Problem: "Charts not rendering"
**Solution**:
- Check console (F12) for errors
- Verify SVG elements exist
- Hard refresh (Ctrl+Shift+R)

### Problem: "Low performance score"
**Solution**:
- Check DevTools → Performance tab
- Look for long tasks > 50ms
- Profile with DevTools

### Problem: "Responsive not working"
**Solution**:
- Check viewport meta tag exists
- Verify media queries in CSS
- Test with actual device emulation
- Check window.innerWidth

---

## Performance Benchmarks

After all tests pass, you should see:

```
📊 Performance Metrics
━━━━━━━━━━━━━━━━━━━━━━━━
✓ Page Load: < 1s
✓ Navigation: < 300ms
✓ Chart Render: < 200ms
✓ Animation FPS: 60 constant
✓ CPU Idle: < 1%
✓ Memory: < 50MB
✓ Lighthouse: 95+
```

---

## Next Steps After Testing

1. ✅ All tests pass?
   → Ready for production!

2. ✅ Some tests fail?
   → Check error messages
   → Review relevant sections
   → Fix issues, re-test

3. ✅ Performance low?
   → Use React.memo on heavy components
   → Add useCallback to event handlers
   → Check DevTools profiler

4. ✅ Ready to deploy?
   → Push to Vercel/Netlify
   → Set up monitoring
   → Share with users

---

## Useful Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F12 | Open DevTools |
| Ctrl+Shift+I | Open DevTools |
| Ctrl+Shift+R | Hard refresh |
| Tab | Navigate accessibility |
| F11 | Fullscreen |
| Ctrl+K | Open DevTools search |

---

## Test Results Template

Copy this and fill in after running tests:

```
Date: _______________
Browser: ____________
Device: _____________
Resolution: _________

Automated Test Score: ____%
CPU Idle: __________%
Memory: ________MB
FPS: ______ constant

✓ Core functionality passes
✓ Navigation works
✓ Mobile responsive
✓ Performance acceptable
✓ No console errors

Status: □ Ready □ Fix needed
```

---

## Still Have Questions?

- **Testing Guide**: See TESTING_GUIDE.md for detailed explanations
- **Performance**: See PRODUCTION_OPTIMIZATION_GUIDE.md
- **Integration**: See INTEGRATION_GUIDE.md

Good luck! 🚀
