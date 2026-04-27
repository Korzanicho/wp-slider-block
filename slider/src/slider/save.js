import { useBlockProps } from '@wordpress/block-editor';

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
	} = attributes;

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

	return (
		<div
			{ ...useBlockProps.save( {
				className: fullWidth ? 'is-full-width' : '',
			} ) }
			style={ containerStyle }
		>
			<div
				className="swiper"
				data-swiper-config={ JSON.stringify( swiperConfig ) }
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
									alt={
										slide.imageAlt || slide.content || ''
									}
									className="slider-slide-image"
								/>
							) }
							{ slide.content && (
								<p className="slider-slide-caption">
									{ slide.content }
								</p>
							) }
						</div>
					) ) }
				</div>

				{ enablePagination && (
					<div className="swiper-pagination"></div>
				) }

				{ enableNavigation && (
					<>
						<div className="swiper-button-prev"></div>
						<div className="swiper-button-next"></div>
					</>
				) }
			</div>
		</div>
	);
}
