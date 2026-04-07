# Testing Quick Reference Card

## 🎯 Test in 2 Minutes

```
┌─────────────────────────────────────────┐
│  AUTOMATED BROWSER TEST (Recommended)   │
├─────────────────────────────────────────┤
│ 1. Open index.html                      │
│ 2. Press F12 → Console tab              │
│ 3. Type: runAllTests()                  │
│ 4. Results show instantly ✓             │
└─────────────────────────────────────────┘
```

## 📊 Test Categories

| Test | Command | Result |
|------|---------|--------|
| **Automated** | `runAllTests()` | ✓ Full suite |
| **Diagnostic** | `quickDiagnostic()` | ℹ️ System info |
| **DOM** | `testDOM()` | ✓ HTML structure |
| **Storage** | `testLocalStorage()` | ✓ Data persist |
| **Tracking** | `testActivityTracking()` | ✓ Events work |
| **Theme** | `testTheme()` | ✓ Dark/light |
| **Navigation** | `testNavigation()` | ✓ Links work |
| **Charts** | `testCharts()` | ✓ Visualize |
| **Performance** | `testPerformance()` | ⚡ Speed |
| **Responsive** | `testResponsive()` | 📱 Layout |
| **Accessibility** | `testAccessibility()` | ♿ A11y |

---

## ⚡ Performance Checks

### FPS Test (Smooth?)
```
DevTools → Performance → Record
Interact with app
Check FPS meter: Should be GREEN at 60 FPS
✓ PASS: Constant 60 FPS line
✗ FAIL: Red drops, stutters
```

### CPU Test (Efficient?)
```
DevTools → Performance Monitor (Esc)
Watch CPU while app idle
✓ PASS: < 1% CPU
✗ FAIL: > 5% CPU constantly
```

### Memory Test (Leaks?)
```
DevTools → Memory → Take heap snapshot
Interact 30 seconds
Take another snapshot
✓ PASS: Stable, not growing
✗ FAIL: Constantly increasing
```

### Lighthouse Test (Production?)
```
DevTools → Lighthouse → Analyze
Wait 30-60 sec
Expected:
✓ Performance: 95+
✓ Accessibility: 90+
✓ Best Practices: 100
✓ SEO: 100
```

---

## 📱 Responsive Check

```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)

320px   → Drawer menu, bottom nav
480px   → Responsive grid
768px   → Desktop layout
1024px  → Full layout
1400px  → Max width

✓ PASS: No horizontal scroll
✓ PASS: Text readable
✓ PASS: Buttons touchable
```

---

## ✅ Manual Checklist (5 min)

### Functionality
- [ ] App loads < 1s
- [ ] Focus score shows
- [ ] Activity tracking works
- [ ] Dark/light theme works

### Navigation
- [ ] Dashboard loads
- [ ] Analytics loads
- [ ] Insights loads
- [ ] Goals loads

### Visual
- [ ] Charts animate smoothly
- [ ] No console errors
- [ ] Responsive at breakpoints
- [ ] Mobile drawer works

### Performance
- [ ] 60 FPS animations
- [ ] CPU < 1% idle
- [ ] Memory < 50MB
- [ ] Load time < 1s

---

## 🔍 Debugging Tips

### If tests fail:

| Error | Fix |
|-------|-----|
| `tracking not found` | Click/type to create data |
| `charts not rendering` | Check console errors |
| `low performance` | Use DevTools profiler |
| `responsive broken` | Check viewport meta tag |
| `theme not working` | Clear localStorage, refresh |
| `navigation stuck` | Check MainLayout routing |

---

## 📋 Test Results Template

```
┌─────────────────────────────────────┐
│ TEST SESSION: _______________       │
├─────────────────────────────────────┤
│ Date: _____________________________ │
│ Browser: __________________________ │
│ Device: ___________________________ │
│                                     │
│ Automated Tests: ______ / ______ ✓ │
│ FPS: _________________________ FPS  │
│ CPU Idle: ___________________ %    │
│ Memory: __________________ MB       │
│ Lighthouse: ________________ Score  │
│                                     │
│ Status: □ PASS □ FAIL □ REVIEW     │
│ Notes: ____________________________ │
│ __________________________________ │
└─────────────────────────────────────┘
```

---

## 🚀 Pre-Production Checklist

- [ ] ✓ runAllTests() = 95%+ PASS
- [ ] ✓ 60 FPS animations constant
- [ ] ✓ CPU < 1% when idle
- [ ] ✓ Memory < 50MB
- [ ] ✓ Responsive 320px-1400px+
- [ ] ✓ Mobile drawer works
- [ ] ✓ Dark/light theme works
- [ ] ✓ Lighthouse 95+ score
- [ ] ✓ No console errors
- [ ] ✓ All features work

→ **READY FOR DEPLOYMENT** 🎉

---

## Console Commands Quick Reference

```javascript
// Run all tests
runAllTests()

// Quick info
quickDiagnostic()

// Individual tests
testDOM()
testLocalStorage()
testActivityTracking()
testTheme()
testNavigation()
testCharts()
testPerformance()
testResponsive()
testAccessibility()

// View localStorage
JSON.parse(localStorage.getItem('focussense-tracking'))
JSON.parse(localStorage.getItem('focussense-goals'))
JSON.parse(localStorage.getItem('focussense-theme'))
```

---

## Expected Test Output

```
╔═══════════════════════════════════╗
║  FOCUSSENSE TEST RESULTS         ║
╚═══════════════════════════════════╝

✅ PASS: DOM structure
✅ PASS: localStorage data
✅ PASS: Activity tracking
✅ PASS: Theme system
✅ PASS: Navigation
✅ PASS: Charts render
✅ PASS: Performance metrics
✅ PASS: Responsive design
✅ PASS: Accessibility

───────────────────────────
✅ PASSED: 32
❌ FAILED: 0
📊 SCORE: 100%
───────────────────────────

✨ All tests passed! ✨
```

---

## Metrics to Monitor

| Metric | Target | Green | Yellow | Red |
|--------|--------|-------|--------|-----|
| **FPS** | 60 | 60 | 50-59 | <50 |
| **CPU** | <1% | <1% | 1-5% | >5% |
| **Memory** | <50MB | <30MB | 30-50MB | >50MB |
| **Load** | <1s | <800ms | 800-1500 | >1500 |
| **Nav** | <300ms | <200ms | 200-300 | >300ms |
| **LCP** | <2.5s | <1s | 1-2.5s | >2.5s |
| **Lighthouse** | 95+ | 95+ | 80-95 | <80 |

---

## Next After Testing

1. ✅ Tests pass? → Components integration
2. ✅ Performance OK? → Add React.memo
3. ✅ Mobile works? → Test on real device
4. ✅ Ready? → Deploy to Vercel

---

**Questions?** See TESTING_GUIDE.md for details
**Ready?** See INTEGRATION_GUIDE.md for next steps
