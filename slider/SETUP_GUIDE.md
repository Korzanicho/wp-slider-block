# WordPress Slider Plugin - Setup Guide

## 📋 Overview

This is a fully-featured WordPress Gutenberg block slider plugin powered by Swiper.js. It provides complete configurability from the WordPress block editor with full-width support and comprehensive styling options.

## 🚀 Installation & Setup

### Prerequisites
- WordPress 6.8+
- PHP 7.4+
- Node.js (for development)

### Installation Steps

1. **Activate the Plugin**
   - Copy the `slider` folder to `/wp-content/plugins/`
   - Go to WordPress Admin > Plugins
   - Activate "Slider" plugin

2. **Build for Production (if needed)**
   ```bash
   cd slider
   npm install
   npm run build
   ```

## 📝 Using the Slider Block

### Adding a Slider

1. Open any post or page in Gutenberg editor
2. Click "+" to add a new block
3. Search for "Slider"
4. Click to add the Slider block

### Configuring Slides

In the **Slides** panel:
- Click "Add Slide" to add new slides
- Edit the slide content in the text field
- Click "Remove Slide" to delete slides
- Each slide is editable independently

### Slider Settings

**Slides Per View**
- Number of slides to display at once
- Range: 1-5
- Default: 1

**Space Between Slides**
- Gap between slides in pixels
- Range: 0-50px
- Default: 10px

**Transition Effect**
- Slide: Horizontal slide animation
- Fade: Smooth fade between slides
- Cube: 3D cube effect
- Coverflow: Flow cover effect
- Flip: 3D flip animation
- Default: Slide

**Transition Speed**
- Animation duration in milliseconds
- Range: 100-2000ms
- Default: 300ms

**Loop Slides**
- Enable continuous looping
- When enabled, after last slide comes first slide
- Default: Enabled

### Pagination Configuration

**Enable Pagination**
- Toggle to show/hide slide indicators
- Default: Enabled

**Pagination Type**
- **Bullets**: Dot indicators (most common)
- **Fraction**: Shows current/total (e.g., "1 / 5")
- **Progressbar**: Horizontal progress bar
- **Custom**: Custom pagination

**Pagination Colors**
- Set color for inactive bullets
- Set color for active/current bullet
- Supports color picker or custom hex values

### Navigation Arrows

**Enable Navigation**
- Toggle to show/hide prev/next buttons
- Default: Enabled

**Arrow Size**
- Size of navigation arrows in pixels
- Range: 16-64px
- Default: 30px

**Arrow Color**
- Choose color for navigation buttons
- Supports color picker or custom hex values

### Autoplay Configuration

**Enable Autoplay**
- Toggle automatic slide progression
- Default: Disabled

**Autoplay Delay**
- Time between auto slide changes in milliseconds
- Range: 1000-10000ms
- Default: 5000ms

**Disable on Interaction**
- Stop autoplay when user interacts with slider
- Default: Enabled

### Layout & Styling

**Full Width**
- Extends slider to full page width
- Overrides container width setting
- Useful for hero sliders
- Default: Disabled

**Container Width** (when not full-width)
- Set custom width
- Examples: "100%", "500px", "80vw", "1200px"
- Default: "100%"

**Container Margin**
- Space around the slider
- Examples: "0", "20px", "10% 0", "0 auto"
- Default: "0"

**Container Padding**
- Internal padding of the slider
- Examples: "0", "20px", "15px 10px"
- Default: "0"

**Slide Height**
- Height of each slide
- Examples: "auto", "300px", "100vh", "500px"
- Default: "auto"

## 🎨 Color Customization

The slider supports CSS variables for advanced styling:

```css
/* Pagination styling */
--swiper-pagination-color: #333333;
--swiper-pagination-bullet-inactive-color: #999999;
--swiper-pagination-bullet-inactive-opacity: 0.5;
--swiper-pagination-bullet-size: 8px;

/* Navigation styling */
--swiper-navigation-color: #333333;
--swiper-navigation-size: 30px;
```

## 🔧 CSS Customization

### Available CSS Classes

```
.wp-block-webkor-slider                  /* Main container */
.wp-block-webkor-slider.is-full-width   /* Full-width variant */
.swiper                                  /* Swiper instance */
.swiper-slide                            /* Individual slide */
.swiper-pagination                       /* Pagination container */
.swiper-button-prev                      /* Previous button */
.swiper-button-next                      /* Next button */
.swiper-pagination-bullet                /* Pagination bullet */
.swiper-pagination-bullet-active         /* Active bullet */
```

### Custom CSS Example

Add to your theme's `style.css`:

```css
/* Custom slider styling */
.wp-block-webkor-slider.my-custom-slider {
  margin: 40px 0;
}

.wp-block-webkor-slider.my-custom-slider .swiper-slide {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 400px;
}

.wp-block-webkor-slider.my-custom-slider .swiper-pagination-bullet {
  border: 2px solid white;
  background: transparent;
}

.wp-block-webkor-slider.my-custom-slider .swiper-pagination-bullet-active {
  background: white;
}
```

## 📱 Responsive Behavior

The slider automatically adapts to screen sizes:

### Desktop (> 768px)
- Full-size arrows and pagination
- 30px arrow size
- 8px pagination bullets

### Tablet (768px - 480px)
- Smaller arrows (20px)
- Smaller pagination (6px)
- Adjusted positioning

### Mobile (< 480px)
- Minimal arrows (18px)
- Minimal pagination (5px)
- Optimized touch targets

## 🎯 Common Use Cases

### Hero Slider
```
- Full Width: ON
- Effect: Fade or Slide
- Slides Per View: 1
- Pagination Type: Bullets
- Navigation: Enabled
- Autoplay: Enabled (5000ms)
```

### Product Carousel
```
- Full Width: OFF
- Slides Per View: 3
- Space Between: 20px
- Effect: Slide
- Pagination: Bullets
- Navigation: Enabled
- Autoplay: Disabled
```

### Image Gallery
```
- Full Width: OFF
- Slides Per View: 4 (desktop)
- Effect: Fade
- Pagination: Fraction
- Navigation: Arrows
- Autoplay: Disabled
```

### Testimonials
```
- Full Width: ON
- Slides Per View: 1
- Effect: Fade
- Pagination: Progressbar
- Navigation: Enabled
- Autoplay: Enabled (7000ms)
```

## 🐛 Troubleshooting

### Slider Not Appearing
1. Ensure plugin is activated
2. Check browser console for JavaScript errors
3. Verify WordPress version is 6.8+

### Autoplay Not Working
1. Check "Enable Autoplay" toggle
2. Verify autoplay delay is set (default 5000ms)
3. Try disabling "Disable autoplay on interaction"

### Pagination Not Visible
1. Toggle "Enable Pagination" on
2. Check pagination colors aren't invisible
3. Verify slide height is sufficient

### Navigation Arrows Overlap Content
1. Increase slide height
2. Adjust arrow size
3. Add container padding

## 📚 Development

### Project Structure
```
slider/
├── src/
│   └── slider/
│       ├── block.json          # Block metadata
│       ├── edit.js             # Editor component
│       ├── save.js             # Frontend markup
│       ├── view.js             # Frontend script
│       ├── index.js            # Block registration
│       ├── editor.scss         # Editor styles
│       ├── style.scss          # Frontend styles
│       └── index.scss          # Additional styles
├── build/                      # Compiled files
├── package.json
├── readme.txt
└── slider.php                  # Main plugin file
```

### Build Commands

```bash
# Development mode (watch for changes)
npm run start

# Production build
npm run build

# Format code
npm run format

# Lint styles
npm run lint:css

# Lint JavaScript
npm run lint:js

# Create plugin zip
npm run plugin-zip
```

## 🔐 Security

The plugin:
- Uses WordPress block API
- Escapes all output
- Sanitizes user input
- Follows WordPress security best practices
- Uses nonces for AJAX requests (if applicable)

## 📜 License

GPL-2.0-or-later

## 🤝 Support

For issues or feature requests:
1. Check the documentation above
2. Review block settings
3. Check browser console for errors
4. Verify WordPress/PHP versions

## 📦 Dependencies

- **Swiper.js** - Modern carousel/slider library
- **WordPress Block Editor** - Gutenberg editor API
- **React** - UI library for block editor

## ✨ Features Summary

✅ Full-width slider support
✅ Multiple transition effects
✅ Customizable pagination
✅ Navigation arrows
✅ Autoplay functionality
✅ Complete color customization
✅ CSS customization options
✅ Responsive design
✅ Touch support
✅ Keyboard navigation
✅ Live editor preview
✅ Easy slide management
