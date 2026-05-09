import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	getCaptionInlineStyle,
	getCaptionPositionStyle,
} from './caption-style';

function SliderSwiper( {
	slides,
	swiperConfig,
	paginationStyle,
	navigationStyle,
	heightMode,
	aspectRatio,
	slideHeight,
	captionStyle,
	enablePagination,
	enableNavigation,
	swiperDefer,
} ) {
	return (
		<div
			className="swiper"
			data-swiper-config={ JSON.stringify( swiperConfig ) }
			{ ...( swiperDefer ? { 'data-swiper-defer': 'true' } : {} ) }
			style={ {
				...paginationStyle,
				...navigationStyle,
			} }
		>
			<div className="swiper-wrapper">
				{ slides.map( ( slide ) => (
					<div
						key={ slide.id }
						className="swiper-slide"
						style={
							heightMode === 'aspect-ratio'
								? { aspectRatio }
								: { height: slideHeight || '320px' }
						}
					>
						{ slide.imageUrl && (
							<img
								src={ slide.imageUrl }
								alt={ slide.imageAlt || slide.content || '' }
								className="slider-slide-image"
							/>
						) }
						{ slide.content && (
							<p
								className="slider-slide-caption"
								style={ {
									...getCaptionPositionStyle(
										slide.captionPosition
									),
									...captionStyle,
								} }
							>
								{ slide.content }
							</p>
						) }
					</div>
				) ) }
			</div>

			{ enablePagination && <div className="swiper-pagination"></div> }

			{ enableNavigation && (
				<>
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
				</>
			) }
		</div>
	);
}

function ModalChrome( { closeLabel, dialogLabel, children } ) {
	return (
		<div className="webkor-slider-modal" hidden>
			<div
				className="webkor-slider-modal__backdrop"
				aria-hidden="true"
			></div>
			<div
				className="webkor-slider-modal__dialog"
				role="dialog"
				aria-modal="true"
				aria-label={ dialogLabel }
			>
				<button
					type="button"
					className="webkor-slider-modal__close"
					aria-label={ closeLabel }
				>
					×
				</button>
				<div className="webkor-slider-modal__stage">{ children }</div>
			</div>
		</div>
	);
}

export default function save( { attributes } ) {
	const {
		slides,
		spaceBetween,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		enablePagination,
		paginationType,
		paginationColor,
		paginationActiveColor,
		enableNavigation,
		navigationColor,
		navigationSize,
		enableAutoplay,
		autoplayDelay,
		autoplayDisableOnInteraction,
		loop,
		effect,
		speed,
		containerWidth,
		containerMargin,
		containerPadding,
		slideHeight,
		heightMode,
		aspectRatio,
		fullWidth,
		captionFontSize,
		captionFontWeight,
		captionFontFamily,
		captionTextColor,
		captionBackgroundColor,
		captionBackgroundOpacity,
		captionBorderRadius,
		modalEnabled,
		isModalOnly,
		modalTriggerSelector,
	} = attributes;

	const captionStyle = getCaptionInlineStyle( {
		captionFontSize,
		captionFontWeight,
		captionFontFamily,
		captionTextColor,
		captionBackgroundColor,
		captionBackgroundOpacity,
		captionBorderRadius,
	} );

	const swiperConfig = {
		spaceBetween,
		slidesPerView:
			slidesPerViewMobile > 0 ? slidesPerViewMobile : slidesPerView,
		breakpoints: {
			480: {
				slidesPerView:
					slidesPerViewTablet > 0
						? slidesPerViewTablet
						: slidesPerView,
			},
			768: { slidesPerView },
		},
		loop,
		effect,
		speed,
		autoplay: enableAutoplay
			? {
					delay: autoplayDelay,
					disableOnInteraction: autoplayDisableOnInteraction,
			  }
			: false,
		pagination: enablePagination
			? {
					el: '.swiper-pagination',
					type: paginationType,
					clickable: true,
			  }
			: false,
		navigation: enableNavigation
			? {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
			  }
			: false,
	};

	const containerStyle = {
		width: fullWidth ? '100vw' : containerWidth,
		marginLeft: fullWidth ? 'calc(-50vw + 50%)' : containerMargin,
		padding: containerPadding,
	};

	const paginationStyle = {
		'--swiper-pagination-color': paginationActiveColor,
		'--swiper-pagination-bullet-inactive-color': paginationColor,
		'--swiper-pagination-bullet-inactive-opacity': '0.5',
		'--swiper-pagination-bullet-size': '8px',
	};

	const navigationStyle = {
		'--swiper-navigation-color': navigationColor,
		'--swiper-navigation-size': `${ navigationSize }px`,
	};

	const swiperProps = {
		slides,
		swiperConfig,
		paginationStyle,
		navigationStyle,
		heightMode,
		aspectRatio,
		slideHeight,
		captionStyle,
		enablePagination,
		enableNavigation,
	};

	const modalOnlyActive = modalEnabled && isModalOnly;

	const blockClassName = [
		fullWidth ? 'is-full-width' : '',
		modalEnabled ? 'has-modal-trigger' : '',
		modalOnlyActive ? 'is-modal-only' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const closeLabel = __( 'Close gallery', 'slider' );
	const dialogLabel = __( 'Image gallery', 'slider' );

	const triggerAttr =
		modalEnabled && modalTriggerSelector ? modalTriggerSelector.trim() : '';

	return (
		<div
			{ ...useBlockProps.save( {
				className: blockClassName,
			} ) }
			style={ containerStyle }
			data-modal-enabled={ modalEnabled ? 'true' : 'false' }
			data-modal-only={ modalOnlyActive ? 'true' : 'false' }
			data-modal-trigger={ triggerAttr || undefined }
		>
			{ ( ! modalEnabled || ! modalOnlyActive ) && (
				<div className="webkor-slider-slot">
					<SliderSwiper { ...swiperProps } swiperDefer={ false } />
				</div>
			) }

			{ modalEnabled && modalOnlyActive && (
				<ModalChrome
					closeLabel={ closeLabel }
					dialogLabel={ dialogLabel }
				>
					<SliderSwiper { ...swiperProps } swiperDefer={ true } />
				</ModalChrome>
			) }

			{ modalEnabled && ! modalOnlyActive && (
				<ModalChrome
					closeLabel={ closeLabel }
					dialogLabel={ dialogLabel }
				/>
			) }
		</div>
	);
}
