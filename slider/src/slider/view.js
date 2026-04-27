/**
 * Frontend script for Swiper initialization
 * This file handles the initialization of Swiper sliders with saved configuration
 */

import Swiper from 'swiper';
import {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
} from 'swiper/modules';

const SWIPER_MODULES = [
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
];

function initSliders() {
	// Find all slider elements
	const sliders = document.querySelectorAll(
		'.wp-block-webkor-slider .swiper'
	);

	sliders.forEach( ( sliderElement ) => {
		if ( sliderElement.classList.contains( 'swiper-initialized' ) ) {
			return;
		}

		try {
			const configData =
				sliderElement.getAttribute( 'data-swiper-config' );
			const config = configData ? JSON.parse( configData ) : {};
			const paginationEl =
				sliderElement.querySelector( '.swiper-pagination' );
			const prevEl = sliderElement.querySelector( '.swiper-button-prev' );
			const nextEl = sliderElement.querySelector( '.swiper-button-next' );

			const runtimeConfig = {
				...config,
				modules: SWIPER_MODULES,
				pagination:
					config.pagination && paginationEl
						? {
								...config.pagination,
								el: paginationEl,
						  }
						: false,
				navigation:
					config.navigation && prevEl && nextEl
						? {
								...config.navigation,
								prevEl,
								nextEl,
						  }
						: false,
			};

			new Swiper( sliderElement, runtimeConfig );
		} catch {
			// Ignore invalid slider configs in frontend.
		}
	} );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initSliders );
} else {
	initSliders();
}
