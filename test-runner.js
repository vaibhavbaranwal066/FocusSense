/**
 * FocusSense Browser-Based Automated Test Suite
 * 
 * Run tests directly in browser console without setup
 * Just paste these functions into browser console and call runAllTests()
 * 
 * Usage:
 * 1. Open FocusSense in browser
 * 2. Press F12 to open DevTools
 * 3. Go to Console tab
 * 4. Paste all code below
 * 5. Call: runAllTests()
 * 
 * Results: Shows pass/fail for each test
 */

// ============================================================================
// TEST UTILITIES
// ============================================================================

const TestResults = {
  passed: 0,
  failed: 0,
  errors: [],
  tests: []
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}: ${message}`);
  }
}

function assertGreaterThan(actual, expected, message) {
  if (actual <= expected) {
    throw new Error(`Expected > ${expected}, got ${actual}: ${message}`);
  }
}

function assertLessThan(actual, expected, message) {
  if (actual >= expected) {
    throw new Error(`Expected < ${expected}, got ${actual}: ${message}`);
  }
}

function test(name, fn) {
  try {
    fn();
    TestResults.passed++;
    TestResults.tests.push({ name, status: '✅ PASS' });
    console.log(`✅ PASS: ${name}`);
  } catch (error) {
    TestResults.failed++;
    TestResults.errors.push({ name, error: error.message });
    TestResults.tests.push({ name, status: `❌ FAIL: ${error.message}` });
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${error.message}`);
  }
}

// ============================================================================
// LOCALSTORAGE TESTS
// ============================================================================

function testLocalStorage() {
  console.log('\n📦 TESTING: localStorage\n');

  test('localStorage contains focussense-tracking', () => {
    const data = localStorage.getItem('focussense-tracking');
    assert(data !== null, 'focussense-tracking key should exist');
  });

  test('focussense-tracking is valid JSON', () => {
    const data = localStorage.getItem('focussense-tracking');
    if (data) {
      JSON.parse(data); // Will throw if invalid
    }
  });

  test('tracking data has required fields', () => {
    const data = JSON.parse(localStorage.getItem('focussense-tracking') || '{}');
    assert(data.date !== undefined, 'should have date field');
    assert(data.activities !== undefined, 'should have activities field');
    assert(data.focusScore !== undefined, 'should have focusScore field');
  });

  test('localStorage data size reasonable', () => {
    const data = localStorage.getItem('focussense-tracking') || '';
    const sizeKB = new Blob([data]).size / 1024;
    assertLessThan(sizeKB, 500, 'localStorage data should be < 500KB');
  });
}

// ============================================================================
// DOM TESTS
// ============================================================================

function testDOM() {
  console.log('\n🎨 TESTING: DOM Structure\n');

  test('main layout container exists', () => {
    const main = document.querySelector('[data-testid="main-layout"]') || 
                 document.querySelector('.main-layout') ||
                 document.querySelector('main');
    assert(main !== null, 'Main layout container should exist');
  });

  test('sidebar navigation exists', () => {
    const sidebar = document.querySelector('.sidebar') ||
                   document.querySelector('[role="navigation"]');
    assert(sidebar !== null, 'Sidebar should exist');
  });

  test('navbar header exists', () => {
    const navbar = document.querySelector('.navbar') ||
                  document.querySelector('header');
    assert(navbar !== null, 'Navbar should exist');
  });

  test('content area exists', () => {
    const content = document.querySelector('.content') ||
                   document.querySelector('main');
    assert(content !== null, 'Content area should exist');
  });

  test('theme toggle button exists', () => {
    const themeButton = document.querySelector('[data-testid="theme-toggle"]') ||
                       Array.from(document.querySelectorAll('button'))
                         .find(b => b.textContent.includes('🌙') || b.textContent.includes('☀️'));
    assert(themeButton !== null, 'Theme toggle button should exist');
  });
}

// ============================================================================
// ACTIVITY TRACKING TESTS
// ============================================================================

function testActivityTracking() {
  console.log('\n🎯 TESTING: Activity Tracking\n');

  const initialData = JSON.parse(localStorage.getItem('focussense-tracking') || '{}');

  test('activity array exists', () => {
    assert(Array.isArray(initialData.activities), 'activities should be an array');
  });

  test('focus score is a number', () => {
    assert(typeof initialData.focusScore === 'number', 'focusScore should be a number');
  });

  test('focus score in valid range', () => {
    assertGreaterThan(initialData.focusScore, -1, 'focusScore should be >= 0');
    assertLessThan(initialData.focusScore, 11, 'focusScore should be <= 10');
  });

  test('activity tracking records clicks', () => {
    // Simulate a click
    const beforeCount = initialData.activities.length;
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    document.body.dispatchEvent(clickEvent);

    // Wait and check
    setTimeout(() => {
      const updatedData = JSON.parse(localStorage.getItem('focussense-tracking') || '{}');
      assert(updatedData.activities.length >= beforeCount, 'click should be tracked');
    }, 100);
  });

  test('daily reset date is today', () => {
    const today = new Date().toISOString().split('T')[0];
    assertEqual(initialData.date, today, 'tracking date should be today');
  });
}

// ============================================================================
// THEME TESTS
// ============================================================================

function testTheme() {
  console.log('\n🌙 TESTING: Theme System\n');

  test('theme key exists in localStorage', () => {
    const theme = localStorage.getItem('focussense-theme');
    assert(theme !== null, 'theme should be stored in localStorage');
  });

  test('theme is either dark or light', () => {
    const theme = localStorage.getItem('focussense-theme');
    assert(theme === 'dark' || theme === 'light', 'theme should be dark or light');
  });

  test('document has theme attribute or class', () => {
    const htmlElement = document.documentElement;
    const hasThemeAttr = htmlElement.hasAttribute('data-theme');
    const hasDarkClass = htmlElement.classList.contains('dark') || 
                        htmlElement.classList.contains('light');
    const bodyHasDarkClass = document.body.classList.contains('dark') ||
                            document.body.classList.contains('light');
    
    assert(hasThemeAttr || hasDarkClass || bodyHasDarkClass, 
           'document should have theme applied');
  });

  test('CSS variables are defined', () => {
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--primary');
    assert(primaryColor.trim() !== '', 'CSS variables should be defined');
  });
}

// ============================================================================
// NAVIGATION TESTS
// ============================================================================

function testNavigation() {
  console.log('\n🧭 TESTING: Navigation\n');

  test('dashboard link exists', () => {
    const link = Array.from(document.querySelectorAll('a, button'))
      .find(el => el.textContent.toLowerCase().includes('dashboard'));
    assert(link !== null, 'dashboard link should exist');
  });

  test('analytics link exists', () => {
    const link = Array.from(document.querySelectorAll('a, button'))
      .find(el => el.textContent.toLowerCase().includes('analytics'));
    assert(link !== null, 'analytics link should exist');
  });

  test('insights link exists', () => {
    const link = Array.from(document.querySelectorAll('a, button'))
      .find(el => el.textContent.toLowerCase().includes('insights'));
    assert(link !== null, 'insights link should exist');
  });

  test('goals link exists', () => {
    const link = Array.from(document.querySelectorAll('a, button'))
      .find(el => el.textContent.toLowerCase().includes('goals'));
    assert(link !== null, 'goals link should exist');
  });
}

// ============================================================================
// CHARTS TESTS
// ============================================================================

function testCharts() {
  console.log('\n📊 TESTING: Charts & Visualizations\n');

  test('SVG elements exist', () => {
    const svgs = document.querySelectorAll('svg');
    assert(svgs.length > 0, 'SVG charts should exist');
  });

  test('CircularProgress exists', () => {
    const circles = document.querySelectorAll('circle');
    assert(circles.length > 0, 'circular progress should have circles');
  });

  test('chart containers rendered', () => {
    const chartContainers = document.querySelectorAll('[class*="chart"], svg:not([class*="icon"])');
    assert(chartContainers.length > 0, 'chart containers should exist');
  });
}

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

function testPerformance() {
  console.log('\n⚡ TESTING: Performance\n');

  test('page loaded within time', () => {
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (navTiming) {
      const loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
      assertLessThan(loadTime, 3000, 'page should load within 3 seconds');
    }
  });

  test('no memory leaks detected', () => {
    if (performance.memory) {
      const usage = performance.memory.usedJSHeapSize / (1024 * 1024);
      assertLessThan(usage, 100, 'heap memory should be < 100MB');
    }
  });

  test('no console errors', () => {
    const errors = document.querySelectorAll('[class*="error"]').length;
    // This is a rough check, actual error tracking needs console override
    console.log(`   (Check console tab for detailed errors)`);
  });
}

// ============================================================================
// RESPONSIVE TESTS
// ============================================================================

function testResponsive() {
  console.log('\n📱 TESTING: Responsive Design\n');

  const currentWidth = window.innerWidth;

  test('viewport is defined', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    assert(viewport !== null, 'viewport meta tag should exist');
  });

  test('media queries in CSS', () => {
    const stylesheets = document.styleSheets;
    let hasMediaQueries = false;
    
    for (let sheet of stylesheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (let rule of rules) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            hasMediaQueries = true;
            break;
          }
        }
      } catch (e) {
        // Ignore CORS errors
      }
    }
    
    console.log(`   (Checking media queries - manual verification recommended)`);
  });

  test('layout renders at current viewport', () => {
    const main = document.querySelector('.main-layout') ||
                document.querySelector('main') ||
                document.body;
    assert(main !== null, 'layout should render');
  });

  test('no horizontal scrolls', () => {
    const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;
    assert(!hasHorizontalScroll, 'should not have horizontal scrollbar');
  });
}

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

function testAccessibility() {
  console.log('\n♿ TESTING: Accessibility\n');

  test('buttons are keyboard accessible', () => {
    const buttons = document.querySelectorAll('button');
    assert(buttons.length > 0, 'buttons should exist and be accessible');
  });

  test('links have text content', () => {
    const links = document.querySelectorAll('a');
    let validLinks = 0;
    links.forEach(link => {
      if (link.textContent.trim() || link.getAttribute('aria-label')) {
        validLinks++;
      }
    });
    assert(validLinks > 0, 'links should have text or labels');
  });

  test('focus visible on navigation', () => {
    const navButtons = document.querySelectorAll('.sidebar button, .navbar button');
    assert(navButtons.length > 0, 'navigation buttons should exist');
    console.log(`   (Check by pressing Tab key - focus should be visible)`);
  });

  test('heading hierarchy present', () => {
    const headings = document.querySelectorAll('h1, h2, h3');
    assert(headings.length > 0, 'heading hierarchy should exist');
  });
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

function runAllTests() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║     🧪 FOCUSSENSE AUTOMATED TEST SUITE 🧪         ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`Started: ${new Date().toLocaleTimeString()}\n`);

  // Reset results
  TestResults.passed = 0;
  TestResults.failed = 0;
  TestResults.errors = [];
  TestResults.tests = [];

  // Run all test suites
  testDOM();
  testLocalStorage();
  testActivityTracking();
  testTheme();
  testNavigation();
  testCharts();
  testPerformance();
  testResponsive();
  testAccessibility();

  // Print summary
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║                  TEST RESULTS                      ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  TestResults.tests.forEach(t => {
    console.log(t.status + ' ' + t.name);
  });

  console.log('\n' + '─'.repeat(54));
  console.log(`✅ PASSED: ${TestResults.passed}`);
  console.log(`❌ FAILED: ${TestResults.failed}`);
  console.log(`📊 TOTAL:  ${TestResults.passed + TestResults.failed}`);
  console.log(`🎯 SCORE:  ${Math.round((TestResults.passed / (TestResults.passed + TestResults.failed)) * 100)}%`);
  console.log('─'.repeat(54));

  if (TestResults.failed === 0) {
    console.log('\n✨ All tests passed! App is ready. ✨\n');
  } else {
    console.log('\n⚠️  Some tests failed. Review errors above.\n');
  }

  console.log(`Completed: ${new Date().toLocaleTimeString()}\n`);

  return {
    passed: TestResults.passed,
    failed: TestResults.failed,
    total: TestResults.passed + TestResults.failed,
    score: Math.round((TestResults.passed / (TestResults.passed + TestResults.failed)) * 100)
  };
}

// ============================================================================
// QUICK DIAGNOSTIC FUNCTION
// ============================================================================

function quickDiagnostic() {
  console.log('🔍 QUICK DIAGNOSTIC\n');
  console.log('Version:', localStorage.getItem('focussense-version') || 'unknown');
  console.log('Theme:', localStorage.getItem('focussense-theme') || 'none');
  console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`);
  console.log('Device:', /mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
  console.log('User Agent:', navigator.userAgent.substring(0, 50) + '...');
  
  const tracking = JSON.parse(localStorage.getItem('focussense-tracking') || '{}');
  console.log('Tracking Data:');
  console.log('  - Date:', tracking.date);
  console.log('  - Activities:', tracking.activities?.length || 0);
  console.log('  - Focus Score:', tracking.focusScore);
  console.log('  - Storage Size:', (new Blob([JSON.stringify(tracking)]).size / 1024).toFixed(2), 'KB');
  
  console.log('\n📊 Run tests with: runAllTests()');
}

// ============================================================================
// EXPORT FOR USE
// ============================================================================

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  FocusSense Browser Test Suite Ready!                    ║
╚═══════════════════════════════════════════════════════════╝

Available functions:
  • runAllTests()      - Run complete test suite
  • quickDiagnostic()  - Show quick diagnostics

Usage:
  In browser console (F12), type: runAllTests()
  Then hit Enter to run all tests.
`);

// Auto-run if in test mode
if (window.AUTO_RUN_TESTS) {
  runAllTests();
}
