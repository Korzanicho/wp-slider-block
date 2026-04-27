# Slider Block for WordPress

[![WordPress](https://img.shields.io/badge/WordPress-6.8%2B-21759B?logo=wordpress&logoColor=white)](https://wordpress.org)
[![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Swiper](https://img.shields.io/badge/Swiper-12.x-6332F6?logo=swiper&logoColor=white)](https://swiperjs.com)

Production-ready Gutenberg slider block powered by Swiper.js.

Build responsive, content-rich sliders directly in the editor with full control over layout, behavior, and visual styling, without writing custom JavaScript.

## Why This Block

- Designed for real content workflows: image-first slides with optional captions
- Responsive by default with dedicated desktop/tablet/mobile controls
- Rich motion and interaction options without sacrificing performance
- Live editor preview that mirrors frontend behavior

## Key Features

- Responsive slider with separate settings for desktop/tablet/mobile
- Image and caption support for every slide
- Transition effects: Slide, Fade, Cube, Coverflow, Flip
- Pagination types: Bullets, Fraction, Progressbar, Custom
- Navigation arrows with color and size controls
- Autoplay with configurable delay and interaction behavior
- Height modes: `fixed height` and `aspect ratio`
- Layout options: full width, container width, margin, padding
- Interactive preview in the Gutenberg editor

## Demo and Screenshots

Use this section to showcase your slider in action.

```text
assets/
  demo.gif
  screenshot-editor.png
  screenshot-frontend.png
```

Example markdown once assets are added:

```md
![Editor Preview](assets/screenshot-editor.png)
![Frontend Output](assets/screenshot-frontend.png)
![Slider Demo](assets/demo.gif)
```

## Requirements

- Node.js 18+
- npm 9+
- WordPress 6.8+

## Quick Start (Development)

```bash
npm install
npm run start
```

Dev mode with watch builds files into the `build/` directory.

## Production Build

```bash
npm run build
```

## Useful Commands

```bash
npm run lint:js
npm run lint:css
npm run format
npm run plugin-zip
```

## How to Use the Block

1. Add the **Slider** block in the Gutenberg editor.
2. Add slides and assign an image to each one.
3. Configure slides per view:
   - Desktop (>=768px)
   - Tablet (480-767px)
   - Mobile (<480px)
4. Choose the height mode:
   - `fixed height` (e.g. `320px`, `50vh`)
   - `aspect ratio` (e.g. `16/9`, `4/3`)
5. Adjust navigation, pagination, autoplay, and transition effects.

## Project Structure

```text
slider/
  src/slider/
    block.json
    edit.js
    save.js
    view.js
    style.scss
    editor.scss
  build/
  slider.php
  package.json
  readme.txt
```

## Tech Stack

- Gutenberg Block API (apiVersion 3)
- Swiper.js
- @wordpress/scripts
- SCSS

## License

GPL-2.0-or-later

## Author

Webkor
