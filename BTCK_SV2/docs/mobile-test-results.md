# Mobile browser test results

Date: 2026-10-26. Scope: SV2, all eight HTML pages.

## Environment and layout results

Tested in the in-app Chromium browser using viewport sizes 360 × 844,
390 × 844 and 430 × 844 CSS pixels. These are browser viewport tests,
not tests on physical Android/iOS devices or Safari.

| Page | 360 px | 390 px | 430 px |
| --- | --- | --- | --- |
| index.html | Pass | Pass | Pass |
| designer-dashboard.html | Pass | Pass | Pass |
| designer-moodboard.html | Pass | Pass | Pass |
| designer-version-management.html | Pass | Pass | Pass |
| admin-brief-template-management.html | Pass | Pass | Pass |
| profile.html | Pass after fix | Pass | Pass |
| notifications.html | Pass | Pass | Pass |
| 404.html | Pass | Pass | Pass |

All 24 final checks have document scrollWidth equal to clientWidth.
Vertical scrollbars reduce available content width by 15 px on long pages.
Notification filter tabs intentionally scroll horizontally inside their own
container; selecting the last tab scrolls it into view without page overflow.
No console errors were captured during the tested browser flows.
Raw layout measurements: ../design/mockups/mobile-audit-layout.json.

## Issues fixed

- Profile identity badges overflowed at 360 px. Added mobile wrapping,
  flexible identity width and a three-column statistics grid.
- The skip-to-content link partly covered the mobile header because its
  wrapped height exceeded the fixed hiding offset. Hide it using its own
  height, and keep it inside the viewport when focused.
- Every Brief template incorrectly displayed “Đang cấu hình AI”. Only the
  selected template now uses that label and primary button style.
- Moodboard colour copy tooltips all used the first colour. Each tooltip
  now displays its own HEX value; copying already used the correct value.

## Browser interaction checks at 360 px

- Role entry from navigation portal: Designer and Admin.
- Mobile menu opens, closes using its close button and closes with Escape.
- Profile edit/cancel restores read-only fields.
- Dashboard search displays an empty result and clears correctly.
- Task and version dialogs open/close without horizontal overflow
  (dialog clientWidth and scrollWidth both 309 px).
- Admin template selection updates the selected card and labels;
  AI-1 test displays its simulated result.
- Moodboard AI validates missing input, generates a result, rejects it,
  displays a simulated failure and returns to manual entry.
  Result dialog clientWidth and scrollWidth both 309 px.
- The last notification filter is reachable through the horizontal tabs
  and filters the list correctly.

These checks avoid deleting existing data or changing passwords.
The full Node DOM simulation suite also passed after the fixes; that suite
checks data changes and AI branches separately from actual browser layout.

## Screenshots

- ../design/mockups/mobile-audit-profile-360.jpg
- ../design/mockups/mobile-audit-ai-360.jpg

## Repeat

Run `node tests/verify.cjs` for the DOM simulation suite. For visual checks,
serve the project locally, enter each role through index.html and repeat
the viewport sizes above. Check menus, internal scrolling and dialogs as
well as document width. Physical device and Safari testing remain pending.
