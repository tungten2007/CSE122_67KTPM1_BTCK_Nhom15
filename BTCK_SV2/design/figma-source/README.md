# CreatorStudio SV2 — editable Figma designs

Status: completed and verified after reloading Figma on 2026-10-26.

[Open creatorstudio-sv2](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=0-1)

The user-provided file now contains two pages: **01 Desktop** and **02 Mobile**,
each with eight independent frames. Desktop frames are 1440 px wide; mobile
frames are 390 px wide. Heights follow the full content of each website page.

## Open a screen

| Screen | Desktop | Mobile |
| --- | --- | --- |
| 01 Navigation portal | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-2) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-3408) |
| 02 Designer dashboard | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-208) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-3636) |
| 03 Moodboard | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-682) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-3915) |
| 04 Version management | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-1453) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-4515) |
| 05 Brief templates | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-2850) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=11-2) |
| 06 Profile | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-2009) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-4892) |
| 07 Notifications | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-2395) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-5089) |
| 08 Error 404 | [Edit desktop](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=9-2825) | [Edit mobile](https://www.figma.com/design/4aJfEbqeO6GyTijMEvvOD3/creatorstudio-sv2?node-id=11-380) |

## What is editable

- Native Figma frames, text layers, vector icons, shapes, colours and groups.
- Screens were reconstructed from the rendered DOM and CSS of the current website
  through SVG, then imported and organised using the Figma editor.
- The file contains the main screen layouts, not a wired interactive prototype.
- Text is split into visual lines to preserve the website wrapping. Frames use
  fixed positioning, not reusable Auto Layout components.
- Figma substituted Inter on the text layer inspected where the website uses a
  system font stack. Minor typography and CSS effect differences can remain.

## Verified

- Eight top-level frames on each page; no screen frame nested inside another.
- Frame positions and widths/heights were read from the Figma property panel.
- Editable native Text and Typography controls were verified on a text layer.
- Reloaded the file and confirmed all sixteen frames remained saved.
- [Frame IDs, links and dimensions](figma-frames.json)
- [Verification after reload](verification.json)
- [Desktop overview in Figma](figma-desktop-overview.jpg)
- [Mobile overview in Figma](figma-mobile-overview.jpg)

## Local source assets

- Each page has desktop-*.svg and mobile-*.svg exports for importing again.
- Matching JPG files retain the original full-page website captures.
- [Website capture metadata](screens.json) and [CSS design tokens](design-tokens.json).
- capture-layout.js reads visible DOM geometry without changing website data.
- render-svg.mjs converts those measurements to editable SVG artwork.

These designs were created from the existing implementation. They do not
prove Figma approval before development; lecturer approval and OBS evidence
must still be supplied separately. No sharing permissions were changed.
