=== Slider ===
Contributors:      Webkor
Tags:              block, slider, swiper, carousel, gallery
Tested up to:      6.8
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A fully featured, responsive slider block for WordPress Gutenberg with Swiper.js library.

== Description ==

Slider is a modern WordPress Gutenberg block that provides a fully responsive, feature-rich slider powered by Swiper.js library.

**Key Features:**

* 🎨 Fully Responsive Design
* 🔄 Multiple Transition Effects (Slide, Fade, Cube, Coverflow, Flip)
* 📍 Pagination Options (Bullets, Fraction, Progressbar)
* ⬅️➡️ Navigation Arrows with Custom Styling
* ▶️ Autoplay with Configurable Delay
* 🎯 Full Width Option for Edge-to-Edge Sliders
* 🎨 Complete Color Customization
  * Pagination Color & Active State Color
  * Navigation Arrow Color and Size
* ⚙️ Comprehensive CSS Settings
  * Container Width, Margin, and Padding
  * Slide Height Control
  * Custom Spacing Between Slides
* 🔧 Easy Configuration
  * Add/Remove Slides
  * Configure All Swiper Options from Block Inspector
  * Live Preview in Editor
* 📱 Touch and Gesture Support
* ⌨️ Keyboard Navigation

== Installation ==

1. Install the plugin from WordPress plugin directory or upload to /wp-content/plugins/
2. Activate the plugin from WordPress admin panel
3. Add the Slider block to any post or page in Gutenberg editor

== Usage ==

1. In the Gutenberg editor, add a new block and search for "Slider"
2. **Configure Slides:**
   - Add slides using the "Add Slide" button
   - Edit slide content for each slide
   - Remove slides you don't need
3. **Slider Settings:**
   - Set number of slides per view
   - Choose transition effect (Slide, Fade, Cube, Coverflow, Flip)
   - Set transition speed in milliseconds
   - Toggle loop mode
   - Control space between slides
4. **Pagination:**
   - Enable/disable pagination
   - Choose pagination type (Bullets, Fraction, Progressbar)
   - Set inactive bullet color
   - Set active bullet color
5. **Navigation Arrows:**
   - Enable/disable navigation buttons
   - Set arrow size
   - Set arrow color
6. **Autoplay:**
   - Enable/disable autoplay
   - Set autoplay delay
   - Control behavior on user interaction
7. **Layout & Styling:**
   - Option for full-width slider
   - Control container width (supports %, px, vw units)
   - Set container margin and padding
   - Set slide height (auto, px, or viewport units)

== Features ==

=== Swiper.js Integration ===
Full integration with Swiper.js library providing:
- Smooth hardware-accelerated transitions
- Touch gesture support
- Mouse wheel support
- Keyboard navigation
- Mobile-friendly design
- Performance optimized

=== Transition Effects ===
- Slide (default)
- Fade
- Cube
- Coverflow
- Flip

=== Pagination Types ===
- Bullets with hover effects
- Fraction display (e.g., "1 / 5")
- Progressbar
- Customizable colors and sizes

=== Responsive Design ===
- Automatic responsive adjustments
- Mobile-optimized navigation
- Touch-friendly controls
- Breakpoint-aware sizing

=== Customization Options ===

**Layout:**
- Full width slider (extends to full page width)
- Custom container width (%, px, vw units)
- Container margin
- Container padding
- Slide height

**Styling:**
- Pagination color and active state color
- Navigation arrow color and size
- Spacing between slides
- Transition speed

**Behavior:**
- Loop slides
- Autoplay with configurable delay
- Disable autoplay on user interaction
- Multiple slides per view

== CSS Variables ==

The plugin uses CSS variables for easy customization:

- `--swiper-pagination-color` - Active pagination color
- `--swiper-pagination-bullet-inactive-color` - Inactive pagination color
- `--swiper-pagination-bullet-inactive-opacity` - Inactive pagination opacity
- `--swiper-pagination-bullet-size` - Pagination bullet size
- `--swiper-navigation-color` - Navigation arrow color
- `--swiper-navigation-size` - Navigation arrow size

== CSS Classes ==

The plugin applies the following CSS classes for custom styling:

- `.wp-block-webkor-slider` - Main slider container
- `.wp-block-webkor-slider.is-full-width` - Full-width slider
- `.swiper` - Swiper container
- `.swiper-slide` - Individual slides
- `.swiper-pagination` - Pagination container
- `.swiper-button-prev` - Previous button
- `.swiper-button-next` - Next button
- `.swiper-pagination-bullet` - Pagination bullet
- `.swiper-pagination-bullet-active` - Active pagination bullet

== Browser Support ==

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)
- Touch and gesture support on all modern devices

== Performance ==

- Optimized bundle size
- Hardware-accelerated animations
- Lazy loading support
- Minimal DOM manipulation
- Efficient event handling

== Changelog ==

= 0.1.0 =
* Initial release
* Swiper.js integration
* Full configuration options
* Multiple pagination types
* Multiple transition effects
* Custom styling options
* Full-width support
* Responsive design
* Touch and gesture support

== License ==

This plugin is licensed under the GPL-2.0-or-later license.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/slider` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 0.1.0 =
* Release

== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
