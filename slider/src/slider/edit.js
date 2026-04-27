import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
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
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import './editor.scss';

const SWIPER_MODULES = [
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
];

function normalizeCssSize( value, fallback ) {
	if ( ! value || value === 'auto' ) {
		return fallback;
	}

	const trimmed = String( value ).trim();

	if ( /^\d+(\.\d+)?$/.test( trimmed ) ) {
		return `${ trimmed }px`;
	}

	return trimmed;
}

export default function Edit( { attributes, setAttributes } ) {
	const previewRef = useRef( null );
	const previewInstanceRef = useRef( null );

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

	const blockProps = useBlockProps( {
		className: fullWidth ? 'wp-block-webkor-slider--full-width' : '',
		style: {
			width: fullWidth ? '100vw' : containerWidth,
			margin: fullWidth ? undefined : containerMargin,
			padding: containerPadding,
			marginLeft: fullWidth ? 'calc(-50vw + 50%)' : undefined,
		},
	} );

	const normalizedHeightMode =
		heightMode === 'aspect-ratio' ? 'aspect-ratio' : 'fixed';
	const resolvedFixedHeight = normalizeCssSize( slideHeight, '320px' );
	const resolvedAspectRatio = ( aspectRatio || '16/9' ).replace( ':', '/' );
	const previewSwiperSizeStyle =
		normalizedHeightMode === 'aspect-ratio'
			? { aspectRatio: resolvedAspectRatio }
			: {
					height: resolvedFixedHeight,
					minHeight: resolvedFixedHeight,
			  };
	const previewSlideSizeStyle =
		normalizedHeightMode === 'aspect-ratio'
			? { aspectRatio: resolvedAspectRatio }
			: {
					height: resolvedFixedHeight,
					minHeight: resolvedFixedHeight,
			  };

	const handleAddSlide = () => {
		const newSlide = {
			id: `slide-${ Date.now() }`,
			content: `Slide ${ slides.length + 1 }`,
			imageId: 0,
			imageUrl: '',
			imageAlt: '',
		};
		setAttributes( {
			slides: [ ...slides, newSlide ],
		} );
	};

	const handleRemoveSlide = ( index ) => {
		setAttributes( {
			slides: slides.filter( ( _, i ) => i !== index ),
		} );
	};

	const handleUpdateSlide = ( index, content ) => {
		const updatedSlides = [ ...slides ];
		updatedSlides[ index ].content = content;
		setAttributes( { slides: updatedSlides } );
	};

	const handleSlideImageSelect = ( index, media ) => {
		const updatedSlides = [ ...slides ];
		updatedSlides[ index ] = {
			...updatedSlides[ index ],
			imageId: media?.id || 0,
			imageUrl: media?.url || '',
			imageAlt: media?.alt || '',
		};
		setAttributes( { slides: updatedSlides } );
	};

	const handleSlideImageRemove = ( index ) => {
		const updatedSlides = [ ...slides ];
		updatedSlides[ index ] = {
			...updatedSlides[ index ],
			imageId: 0,
			imageUrl: '',
			imageAlt: '',
		};
		setAttributes( { slides: updatedSlides } );
	};

	useEffect( () => {
		if ( ! previewRef.current ) {
			return undefined;
		}

		if ( previewInstanceRef.current ) {
			previewInstanceRef.current.destroy( true, true );
			previewInstanceRef.current = null;
		}

		const swiperElement = previewRef.current.querySelector( '.swiper' );
		if ( ! swiperElement ) {
			return undefined;
		}

		const paginationEl =
			swiperElement.querySelector( '.swiper-pagination' );
		const nextEl = swiperElement.querySelector( '.swiper-button-next' );
		const prevEl = swiperElement.querySelector( '.swiper-button-prev' );

		const applyPreviewHeightStyles = () => {
			const wrapperElement =
				swiperElement.querySelector( '.swiper-wrapper' );
			const slideElements =
				swiperElement.querySelectorAll( '.swiper-slide' );

			if ( normalizedHeightMode === 'aspect-ratio' ) {
				swiperElement.style.aspectRatio = resolvedAspectRatio;
				swiperElement.style.removeProperty( 'height' );
				swiperElement.style.removeProperty( 'min-height' );

				if ( wrapperElement ) {
					wrapperElement.style.height = '100%';
					wrapperElement.style.minHeight = '100%';
				}

				slideElements.forEach( ( slideElement ) => {
					slideElement.style.height = '100%';
					slideElement.style.minHeight = '100%';
					slideElement.style.aspectRatio = resolvedAspectRatio;
				} );

				return;
			}

			swiperElement.style.removeProperty( 'aspect-ratio' );
			swiperElement.style.height = resolvedFixedHeight;
			swiperElement.style.minHeight = resolvedFixedHeight;

			if ( wrapperElement ) {
				wrapperElement.style.height = resolvedFixedHeight;
				wrapperElement.style.minHeight = resolvedFixedHeight;
			}

			slideElements.forEach( ( slideElement ) => {
				slideElement.style.height = resolvedFixedHeight;
				slideElement.style.minHeight = resolvedFixedHeight;
				slideElement.style.removeProperty( 'aspect-ratio' );
			} );
		};

		applyPreviewHeightStyles();

		try {
			previewInstanceRef.current = new Swiper( swiperElement, {
				modules: SWIPER_MODULES,
				breakpointsBase: 'container',
				observeParents: true,
				observer: true,
				spaceBetween,
				slidesPerView:
					slidesPerViewMobile > 0
						? slidesPerViewMobile
						: slidesPerView,
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
				pagination:
					enablePagination && paginationEl
						? {
								el: paginationEl,
								type: paginationType,
								clickable: true,
						  }
						: false,
				navigation:
					enableNavigation && prevEl && nextEl
						? {
								prevEl,
								nextEl,
						  }
						: false,
			} );

			applyPreviewHeightStyles();
			previewInstanceRef.current.update();
		} catch {
			previewInstanceRef.current = null;
		}

		return () => {
			if ( previewInstanceRef.current ) {
				previewInstanceRef.current.destroy( true, true );
				previewInstanceRef.current = null;
			}
		};
	}, [
		slides,
		spaceBetween,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		normalizedHeightMode,
		resolvedFixedHeight,
		resolvedAspectRatio,
		enablePagination,
		paginationType,
		enableNavigation,
		enableAutoplay,
		autoplayDelay,
		autoplayDisableOnInteraction,
		loop,
		effect,
		speed,
	] );

	return (
		<>
			<InspectorControls>
				{ /* Slides Management */ }
				<PanelBody
					title={ __( 'Slides', 'slider' ) }
					initialOpen={ true }
				>
					<div className="slider-slides-list">
						{ slides.map( ( slide, index ) => {
							const slideCaptionLabel = sprintf(
								/* translators: %d: Slide number in editor settings. */
								__( 'Slide %d caption', 'slider' ),
								index + 1
							);

							return (
								<div key={ slide.id } className="slide-item">
									<TextControl
										label={ slideCaptionLabel }
										value={ slide.content }
										onChange={ ( value ) =>
											handleUpdateSlide( index, value )
										}
									/>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( media ) =>
												handleSlideImageSelect(
													index,
													media
												)
											}
											allowedTypes={ [ 'image' ] }
											value={ slide.imageId }
											render={ ( { open } ) => (
												<Button
													variant="secondary"
													onClick={ open }
													style={ {
														marginTop: '8px',
														marginRight: '8px',
													} }
												>
													{ slide.imageUrl
														? __(
																'Replace image',
																'slider'
														  )
														: __(
																'Select image',
																'slider'
														  ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									{ slide.imageUrl && (
										<Button
											isDestructive
											variant="secondary"
											onClick={ () =>
												handleSlideImageRemove( index )
											}
											style={ { marginTop: '8px' } }
										>
											{ __( 'Remove image', 'slider' ) }
										</Button>
									) }
									<Button
										isDestructive
										onClick={ () =>
											handleRemoveSlide( index )
										}
										style={ {
											marginTop: '8px',
											display: 'block',
										} }
									>
										{ __( 'Remove Slide', 'slider' ) }
									</Button>
									<hr />
								</div>
							);
						} ) }
					</div>
					<Button isPrimary onClick={ handleAddSlide }>
						{ __( 'Add Slide', 'slider' ) }
					</Button>
				</PanelBody>

				{ /* Swiper Settings */ }
				<PanelBody
					title={ __( 'Slider Settings', 'slider' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Slides Per View (desktop ≥768px)',
							'slider'
						) }
						value={ slidesPerView }
						onChange={ ( value ) =>
							setAttributes( { slidesPerView: value } )
						}
						min={ 1 }
						max={ 5 }
					/>
					<RangeControl
						label={ __(
							'Slides Per View (tablet 480–767px)',
							'slider'
						) }
						value={ slidesPerViewTablet }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewTablet: value } )
						}
						min={ 0 }
						max={ 5 }
					/>
					<RangeControl
						label={ __(
							'Slides Per View (mobile <480px)',
							'slider'
						) }
						value={ slidesPerViewMobile }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewMobile: value } )
						}
						min={ 0 }
						max={ 5 }
					/>
					<RangeControl
						label={ __( 'Space Between Slides (px)', 'slider' ) }
						value={ spaceBetween }
						onChange={ ( value ) =>
							setAttributes( { spaceBetween: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Transition Effect', 'slider' ) }
						value={ effect }
						options={ [
							{ label: 'Slide', value: 'slide' },
							{ label: 'Fade', value: 'fade' },
							{ label: 'Cube', value: 'cube' },
							{ label: 'Coverflow', value: 'coverflow' },
							{ label: 'Flip', value: 'flip' },
						] }
						onChange={ ( value ) =>
							setAttributes( { effect: value } )
						}
					/>
					<RangeControl
						label={ __( 'Transition Speed (ms)', 'slider' ) }
						value={ speed }
						onChange={ ( value ) =>
							setAttributes( { speed: value } )
						}
						min={ 100 }
						max={ 2000 }
						step={ 100 }
					/>
					<ToggleControl
						label={ __( 'Loop Slides', 'slider' ) }
						checked={ loop }
						onChange={ ( value ) =>
							setAttributes( { loop: value } )
						}
					/>
				</PanelBody>

				{ /* Pagination Settings */ }
				<PanelBody
					title={ __( 'Pagination', 'slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable Pagination', 'slider' ) }
						checked={ enablePagination }
						onChange={ ( value ) =>
							setAttributes( { enablePagination: value } )
						}
					/>
					{ enablePagination && (
						<>
							<SelectControl
								label={ __( 'Pagination Type', 'slider' ) }
								value={ paginationType }
								options={ [
									{ label: 'Bullets', value: 'bullets' },
									{ label: 'Fraction', value: 'fraction' },
									{
										label: 'Progressbar',
										value: 'progressbar',
									},
									{ label: 'Custom', value: 'custom' },
								] }
								onChange={ ( value ) =>
									setAttributes( {
										paginationType: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>

				{ /* Navigation Settings */ }
				<PanelBody
					title={ __( 'Navigation Arrows', 'slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable Navigation', 'slider' ) }
						checked={ enableNavigation }
						onChange={ ( value ) =>
							setAttributes( { enableNavigation: value } )
						}
					/>
					{ enableNavigation && (
						<>
							<RangeControl
								label={ __( 'Arrow Size (px)', 'slider' ) }
								value={ navigationSize }
								onChange={ ( value ) =>
									setAttributes( {
										navigationSize: value,
									} )
								}
								min={ 16 }
								max={ 64 }
							/>
						</>
					) }
				</PanelBody>

				{ /* Autoplay Settings */ }
				<PanelBody
					title={ __( 'Autoplay', 'slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable Autoplay', 'slider' ) }
						checked={ enableAutoplay }
						onChange={ ( value ) =>
							setAttributes( { enableAutoplay: value } )
						}
					/>
					{ enableAutoplay && (
						<>
							<RangeControl
								label={ __( 'Autoplay Delay (ms)', 'slider' ) }
								value={ autoplayDelay }
								onChange={ ( value ) =>
									setAttributes( { autoplayDelay: value } )
								}
								min={ 1000 }
								max={ 10000 }
								step={ 500 }
							/>
							<ToggleControl
								label={ __(
									'Disable autoplay on user interaction',
									'slider'
								) }
								checked={ autoplayDisableOnInteraction }
								onChange={ ( value ) =>
									setAttributes( {
										autoplayDisableOnInteraction: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>

				{ /* Layout Settings */ }
				<PanelBody
					title={ __( 'Layout & Styling', 'slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Full Width', 'slider' ) }
						checked={ fullWidth }
						onChange={ ( value ) =>
							setAttributes( { fullWidth: value } )
						}
						help={ __(
							'Extends slider to full page width',
							'slider'
						) }
					/>
					{ ! fullWidth && (
						<TextControl
							label={ __( 'Container Width', 'slider' ) }
							value={ containerWidth }
							onChange={ ( value ) =>
								setAttributes( {
									containerWidth: value,
								} )
							}
							help={ __( 'e.g., 100%, 500px, 80vw', 'slider' ) }
						/>
					) }
					<TextControl
						label={ __( 'Container Margin', 'slider' ) }
						value={ containerMargin }
						onChange={ ( value ) =>
							setAttributes( { containerMargin: value } )
						}
						help={ __( 'e.g., 0, 20px, 10% 0', 'slider' ) }
					/>
					<TextControl
						label={ __( 'Container Padding', 'slider' ) }
						value={ containerPadding }
						onChange={ ( value ) =>
							setAttributes( { containerPadding: value } )
						}
						help={ __( 'e.g., 0, 20px, 10% 0', 'slider' ) }
					/>
					<SelectControl
						label={ __( 'Height Mode', 'slider' ) }
						value={ heightMode }
						options={ [
							{
								label: __( 'Fixed height', 'slider' ),
								value: 'fixed',
							},
							{
								label: __( 'Aspect ratio', 'slider' ),
								value: 'aspect-ratio',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { heightMode: value } )
						}
					/>
					{ heightMode === 'fixed' && (
						<TextControl
							label={ __( 'Slide Height', 'slider' ) }
							value={ slideHeight }
							onChange={ ( value ) =>
								setAttributes( { slideHeight: value } )
							}
							help={ __( 'e.g., 300px, 50vh', 'slider' ) }
						/>
					) }
					{ heightMode === 'aspect-ratio' && (
						<SelectControl
							label={ __( 'Aspect Ratio', 'slider' ) }
							value={ aspectRatio }
							options={ [
								{ label: '16:9', value: '16/9' },
								{ label: '4:3', value: '4/3' },
								{ label: '3:2', value: '3/2' },
								{ label: '1:1', value: '1/1' },
								{ label: '21:9', value: '21/9' },
							] }
							onChange={ ( value ) =>
								setAttributes( { aspectRatio: value } )
							}
						/>
					) }
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'slider' ) }
					colorSettings={ [
						{
							value: paginationColor,
							onChange: ( color ) =>
								setAttributes( {
									paginationColor: color || '#999999',
								} ),
							label: __( 'Pagination', 'slider' ),
						},
						{
							value: paginationActiveColor,
							onChange: ( color ) =>
								setAttributes( {
									paginationActiveColor: color || '#333333',
								} ),
							label: __( 'Pagination Active', 'slider' ),
						},
						{
							value: navigationColor,
							onChange: ( color ) =>
								setAttributes( {
									navigationColor: color || '#333333',
								} ),
							label: __( 'Navigation Arrows', 'slider' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps } ref={ previewRef }>
				<div className="wp-block-webkor-slider-preview">
					<div
						className="swiper"
						style={ {
							'--swiper-pagination-color': paginationActiveColor,
							'--swiper-pagination-bullet-inactive-color':
								paginationColor,
							'--swiper-navigation-color': navigationColor,
							'--swiper-navigation-size': `${ navigationSize }px`,
							...previewSwiperSizeStyle,
						} }
					>
						<div className="swiper-wrapper">
							{ slides.map( ( slide ) => (
								<div
									key={ slide.id }
									className="swiper-slide"
									style={ previewSlideSizeStyle }
								>
									{ slide.imageUrl && (
										<img
											src={ slide.imageUrl }
											alt={
												slide.imageAlt ||
												slide.content ||
												''
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
							<div
								className="swiper-pagination"
								style={ {
									color: paginationColor,
								} }
							></div>
						) }
						{ enableNavigation && (
							<>
								<div
									className="swiper-button-prev"
									style={ {
										color: navigationColor,
										fontSize: `${ navigationSize }px`,
									} }
								></div>
								<div
									className="swiper-button-next"
									style={ {
										color: navigationColor,
										fontSize: `${ navigationSize }px`,
									} }
								></div>
							</>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
