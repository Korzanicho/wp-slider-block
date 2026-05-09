/**
 * Frontend: Swiper + optional lightbox (CSS trigger selector, ESC, close button).
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

const SCROLL_LOCK_CLASS = 'webkor-slider-modal--open';

function buildRuntimeConfig( sliderElement, config ) {
	const paginationEl = sliderElement.querySelector( '.swiper-pagination' );
	const prevEl = sliderElement.querySelector( '.swiper-button-prev' );
	const nextEl = sliderElement.querySelector( '.swiper-button-next' );

	return {
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
}

function initSwiperSlider( sliderElement ) {
	if ( sliderElement.classList.contains( 'swiper-initialized' ) ) {
		return sliderElement.swiper;
	}

	try {
		const configData = sliderElement.getAttribute( 'data-swiper-config' );
		const config = configData ? JSON.parse( configData ) : {};
		const runtimeConfig = buildRuntimeConfig( sliderElement, config );
		return new Swiper( sliderElement, runtimeConfig );
	} catch {
		return null;
	}
}

function refreshSwiper( sliderElement ) {
	const sw = sliderElement?.swiper;
	if ( ! sw ) {
		return;
	}
	window.requestAnimationFrame( () => {
		sw.update();
		window.requestAnimationFrame( () => {
			sw.update();
		} );
	} );
}

function initInlineSliders() {
	document
		.querySelectorAll( '.wp-block-webkor-slider .swiper' )
		.forEach( ( sliderElement ) => {
			if (
				sliderElement.getAttribute( 'data-swiper-defer' ) === 'true'
			) {
				return;
			}

			if ( sliderElement.classList.contains( 'swiper-initialized' ) ) {
				return;
			}

			initSwiperSlider( sliderElement );
		} );
}

function setupModalRoot( root ) {
	const enabled = root.getAttribute( 'data-modal-enabled' ) === 'true';
	if ( ! enabled ) {
		return;
	}

	const triggerSel = (
		root.getAttribute( 'data-modal-trigger' ) || ''
	).trim();
	if ( ! triggerSel ) {
		return;
	}

	const modal = root.querySelector( '.webkor-slider-modal' );
	const stage = root.querySelector( '.webkor-slider-modal__stage' );
	if ( ! modal || ! stage ) {
		return;
	}

	const modalOnly = root.getAttribute( 'data-modal-only' ) === 'true';
	const slot = root.querySelector( '.webkor-slider-slot' );
	const swiperEl = modalOnly
		? stage.querySelector( '.swiper' )
		: slot?.querySelector( '.swiper' );

	if ( ! swiperEl ) {
		return;
	}

	const closeBtn = root.querySelector( '.webkor-slider-modal__close' );
	const backdrop = root.querySelector( '.webkor-slider-modal__backdrop' );

	let triggerNodes = [];
	let lastFocus = null;

	function bindTriggers() {
		triggerNodes.forEach( ( { node, handler } ) => {
			node.removeEventListener( 'click', handler );
		} );
		triggerNodes = [];

		let nodes;
		try {
			nodes = document.querySelectorAll( triggerSel );
		} catch {
			return;
		}

		nodes.forEach( ( node ) => {
			const handler = ( event ) => {
				event.preventDefault();
				openModal();
			};
			node.addEventListener( 'click', handler );
			triggerNodes.push( { node, handler } );
		} );
	}

	function openModal() {
		if ( ! modal.hasAttribute( 'hidden' ) ) {
			return;
		}

		lastFocus = root.ownerDocument.activeElement;

		if ( ! modalOnly ) {
			stage.appendChild( swiperEl );
		}

		modal.removeAttribute( 'hidden' );
		document.documentElement.classList.add( SCROLL_LOCK_CLASS );

		initSwiperSlider( swiperEl );
		refreshSwiper( swiperEl );

		closeBtn?.focus( { preventScroll: true } );
	}

	function closeModal() {
		if ( modal.hasAttribute( 'hidden' ) ) {
			return;
		}

		modal.setAttribute( 'hidden', '' );
		document.documentElement.classList.remove( SCROLL_LOCK_CLASS );

		if ( ! modalOnly && slot ) {
			slot.appendChild( swiperEl );
			refreshSwiper( swiperEl );
		}

		if ( lastFocus && typeof lastFocus.focus === 'function' ) {
			lastFocus.focus( { preventScroll: true } );
		}
		lastFocus = null;
	}

	function onDocKeydown( event ) {
		if ( event.key !== 'Escape' ) {
			return;
		}
		if ( modal.hasAttribute( 'hidden' ) ) {
			return;
		}
		closeModal();
	}

	bindTriggers();

	closeBtn?.addEventListener( 'click', closeModal );
	backdrop?.addEventListener( 'click', closeModal );

	document.addEventListener( 'keydown', onDocKeydown );
}

function init() {
	initInlineSliders();

	document
		.querySelectorAll(
			'.wp-block-webkor-slider[data-modal-enabled="true"]'
		)
		.forEach( setupModalRoot );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
