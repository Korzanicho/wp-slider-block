/**
 * Frontend script for Swiper initialization
 * This file handles the initialization of Swiper sliders with saved configuration
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip } from 'swiper/modules';

// Register Swiper modules
Swiper.use( [ Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip ] );

function initSliders() {
	// Find all slider elements
	const sliders = document.querySelectorAll( '.wp-block-webkor-slider .swiper' );

	sliders.forEach( ( sliderElement ) => {
		if ( sliderElement.classList.contains( 'swiper-initialized' ) ) {
			return;
		}

		try {
			// Get configuration from data attribute
			const configData = sliderElement.getAttribute( 'data-swiper-config' );
			const config = configData ? JSON.parse( configData ) : {};

			// Initialize Swiper with the configuration
			new Swiper( sliderElement, config );
		} catch ( error ) {
			console.error( 'Error initializing Swiper:', error );
		}
	} );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initSliders );
} else {
	initSliders();
}
