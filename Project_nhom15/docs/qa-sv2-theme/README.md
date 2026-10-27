# SV2 interface, responsive layout and accessibility check

Date: 2026-10-27. Scope: the integrated `Project_nhom15` group project.

## Pages

| Page | Workspace role |
| --- | --- |
| Designer dashboard | Designer |
| Designer moodboard | Designer |
| Designer version management | Designer |
| Brief template management | Admin |
| Profile | Shared |
| Notifications | Shared |

## Changes

- Reused the existing SV3 team workspace shell, shared design tokens and local Inter font. SV2 now uses the same forest green, light paper background, sidebar, top bar, account/project controls and footer as the integrated group interface.
- Added `css/sv2/team-pages.css` for scoped SV2 layout and accessibility adjustments. Each page still loads its own stylesheet and script. No SV1/SV3 page was rewritten.
- Wrapped toolbars, headings, notification tabs, action buttons and long content on small screens. Fixed a stretched mobile header button and a compressed search field.
- Improved text contrast, input borders, placeholders, destructive actions, notification badges and visible keyboard focus. Copy HEX controls stay visible without requiring hover.
- Named dialogs and form controls, connected field errors using `aria-describedby` and `aria-invalid`, and exposed pressed states on filters and template selection.
- Made the closed mobile sidebar inert; opening it traps Tab, isolates background content, and supports Escape/focus return. Switching between desktop and mobile resets that state correctly.
- Retained keyboard focus when task, notification, template and version lists are redrawn. Dialogs return focus to the opener or the main content when the opener no longer exists.
- Exposed AI progress through a status message; processing, result and error transitions move focus to their message. Invalid AI input is identified at the textarea. Existing simulated AI/data workflow is retained.
- Honored reduced-motion preferences for the shared shell, skeletons and decorative animations.

## Browser checks

| Check | Result |
| --- | --- |
| All six pages at viewport widths 320, 375, 768 and 1024 px | 24 cases, no document horizontal overflow or broken visible images |
| Six desktop pages: heading/main count, duplicate IDs, form labels, dialog names | No issues in the inspected DOM |
| CSS text/background contrast on six desktop pages | No failures in the measured visible text |
| Dashboard normal, loading, empty, error and urgent states | No measured label/contrast/overflow issues at 320 px |
| AI input, result, edit and error states at 320 px | No measured label/contrast/overflow issues |
| AI processing/retry/input validation | Status and focus update; retry clears the failure checkbox; invalid input returns focus to the textarea |
| Mobile menu | First/last Tab wrap, Escape closes and returns focus, background is inert |
| Required template field | Error linked to input; focus moves to invalid field; dialog close restores opener |
| Task status keyboard change, notification action and template selection | Focus retained after list redraw |
| Notification filter and skip link | Pressed state updates; skip link focuses main content |
| Browser console | No recorded error entries during the checks |

See [browser-results.json](browser-results.json) for DOM measurements and keyboard observations, and [code-checks.json](code-checks.json) for source syntax, regression and integration test output. All commands recorded there exited successfully.

## Screenshots

- [Dashboard desktop](dashboard-desktop-1280.png)
- [Dashboard mobile](dashboard-mobile-375.png)
- [Brief templates mobile](brief-template-mobile-375.png)
- [Moodboard AI error at 320 px](moodboard-ai-error-320.png)

## Limits

This is a targeted local browser and source check, not a full WCAG conformance certificate. Browser zoom at 200%, actual phone hardware and a screen reader session were not verified. Automated contrast checks measured CSS text/background colors; inspiration images and SVG palette swatches also received visual inspection. Tests ran on a separate local preview origin to avoid changing the user's existing demo state. No GitHub upload is part of this change.
