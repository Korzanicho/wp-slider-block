import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
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
	PanelRow,
	TextControl,
	ToggleControl,
	SelectControl,
	ColorPalette,
	RangeControl,
	Button,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
import './editor.scss';

Swiper.use( [
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
] );

export default function Edit( { attributes, setAttributes } ) {
	const previewRef = useRef( null );
	const previewInstanceRef = useRef( null );

	const {
		slides,
		spaceBetween,
		slidesPerView,
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
		fullWidth,
	} = attributes;

	const blockProps = useBlockProps( {
		className: fullWidth ? 'wp-block-webkor-slider--full-width' : '',
		style: {
			width: fullWidth ? '100vw' : containerWidth,
			marginLeft: fullWidth ? 'calc(-50vw + 50%)' : '0',
		},
	} );

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

	const colors = [
		{ name: 'Black', color: '#000000' },
		{ name: 'White', color: '#ffffff' },
		{ name: 'Gray', color: '#999999' },
		{ name: 'Light Gray', color: '#e0e0e0' },
		{ name: 'Blue', color: '#0073aa' },
		{ name: 'Red', color: '#d32f2f' },
	];

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

		const paginationEl = swiperElement.querySelector( '.swiper-pagination' );
		const nextEl = swiperElement.querySelector( '.swiper-button-next' );
		const prevEl = swiperElement.querySelector( '.swiper-button-prev' );

		previewInstanceRef.current = new Swiper( swiperElement, {
			spaceBetween,
			slidesPerView,
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
		});

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
				{/* Slides Management */}
				<PanelBody title={ __( 'Slides', 'slider' ) } initialOpen={ true }>
					<div className="slider-slides-list">
						{ slides.map( ( slide, index ) => (
							<div key={ slide.id } className="slide-item">
								<TextControl
									label={ __( `Slide ${ index + 1 } caption`, 'slider' ) }
									value={ slide.content }
									onChange={ ( value ) =>
										handleUpdateSlide( index, value )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											handleSlideImageSelect( index, media )
										}
										allowedTypes={ [ 'image' ] }
										value={ slide.imageId }
										render={ ( { open } ) => (
											<Button
												variant="secondary"
												onClick={ open }
												style={ { marginTop: '8px', marginRight: '8px' } }
											>
												{ slide.imageUrl
													? __( 'Replace image', 'slider' )
													: __( 'Select image', 'slider' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ slide.imageUrl && (
									<Button
										isDestructive
										variant="secondary"
										onClick={ () => handleSlideImageRemove( index ) }
										style={ { marginTop: '8px' } }
									>
										{ __( 'Remove image', 'slider' ) }
									</Button>
								) }
								<Button
									isDestructive
									onClick={ () => handleRemoveSlide( index ) }
									style={ { marginTop: '8px', display: 'block' } }
								>
									{ __( 'Remove Slide', 'slider' ) }
								</Button>
								<hr />
							</div>
						) ) }
					</div>
					<Button isPrimary onClick={ handleAddSlide }>
						{ __( 'Add Slide', 'slider' ) }
					</Button>
				</PanelBody>

				{/* Swiper Settings */}
				<PanelBody
					title={ __( 'Slider Settings', 'slider' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slides Per View', 'slider' ) }
						value={ slidesPerView }
						onChange={ ( value ) =>
							setAttributes( { slidesPerView: value } )
						}
						min={ 1 }
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

				{/* Pagination Settings */}
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
									{ label: 'Progressbar', value: 'progressbar' },
									{ label: 'Custom', value: 'custom' },
								] }
								onChange={ ( value ) =>
									setAttributes( {
										paginationType: value,
									} )
								}
							/>
							<PanelRow>
								<label>
									{ __( 'Pagination Color', 'slider' ) }
								</label>
								<ColorPalette
									colors={ colors }
									value={ paginationColor }
									onChange={ ( color ) =>
										setAttributes( {
											paginationColor: color,
										} )
									}
									disableCustomColors={ false }
								/>
							</PanelRow>
							<PanelRow>
								<label>
									{ __( 'Pagination Active Color', 'slider' ) }
								</label>
								<ColorPalette
									colors={ colors }
									value={ paginationActiveColor }
									onChange={ ( color ) =>
										setAttributes( {
											paginationActiveColor: color,
										} )
									}
									disableCustomColors={ false }
								/>
							</PanelRow>
						</>
					) }
				</PanelBody>

				{/* Navigation Settings */}
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
							<PanelRow>
								<label>
									{ __( 'Arrow Color', 'slider' ) }
								</label>
								<ColorPalette
									colors={ colors }
									value={ navigationColor }
									onChange={ ( color ) =>
										setAttributes( {
											navigationColor: color,
										} )
									}
									disableCustomColors={ false }
								/>
							</PanelRow>
						</>
					) }
				</PanelBody>

				{/* Autoplay Settings */}
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

				{/* Layout Settings */}
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
						<InputControl
							label={ __( 'Container Width', 'slider' ) }
							value={ containerWidth }
							onChange={ ( value ) =>
								setAttributes( {
									containerWidth: value,
								} )
							}
							help={ __(
								'e.g., 100%, 500px, 80vw',
								'slider'
							) }
						/>
					) }
					<InputControl
						label={ __( 'Container Margin', 'slider' ) }
						value={ containerMargin }
						onChange={ ( value ) =>
							setAttributes( { containerMargin: value } )
						}
						help={ __(
							'e.g., 0, 20px, 10% 0',
							'slider'
						) }
					/>
					<InputControl
						label={ __( 'Container Padding', 'slider' ) }
						value={ containerPadding }
						onChange={ ( value ) =>
							setAttributes( { containerPadding: value } )
						}
						help={ __(
							'e.g., 0, 20px, 10% 0',
							'slider'
						) }
					/>
					<InputControl
						label={ __( 'Slide Height', 'slider' ) }
						value={ slideHeight }
						onChange={ ( value ) =>
							setAttributes( { slideHeight: value } )
						}
						help={ __(
							'e.g., auto, 300px, 100vh',
							'slider'
						) }
					/>
				</PanelBody>
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
						} }
					>
						<div className="swiper-wrapper">
							{ slides.map( ( slide ) => (
								<div
									key={ slide.id }
									className="swiper-slide"
									style={ {
										minHeight: slideHeight || '320px',
									} }
								>
									{ slide.imageUrl && (
										<img
											src={ slide.imageUrl }
											alt={ slide.imageAlt || slide.content || '' }
											className="slider-slide-image"
										/>
									) }
									{ slide.content && (
										<p className="slider-slide-caption">{ slide.content }</p>
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
