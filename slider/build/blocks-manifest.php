<?php
// This file is generated. Do not modify it manually.
return array(
	'slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'webkor/slider',
		'version' => '0.2.0',
		'title' => 'Slider',
		'category' => 'widgets',
		'icon' => 'images-alt',
		'description' => 'Responsive slider with pagination, navigation, autoplay, and loop options.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'full',
				'wide'
			)
		),
		'attributes' => array(
			'slides' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => 'slide-1',
						'content' => 'Slide 1',
						'imageId' => 0,
						'imageUrl' => '',
						'imageAlt' => ''
					),
					array(
						'id' => 'slide-2',
						'content' => 'Slide 2',
						'imageId' => 0,
						'imageUrl' => '',
						'imageAlt' => ''
					)
				)
			),
			'spaceBetween' => array(
				'type' => 'number',
				'default' => 10
			),
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 1
			),
			'slidesPerViewTablet' => array(
				'type' => 'number',
				'default' => 0
			),
			'slidesPerViewMobile' => array(
				'type' => 'number',
				'default' => 0
			),
			'enablePagination' => array(
				'type' => 'boolean',
				'default' => true
			),
			'paginationType' => array(
				'type' => 'string',
				'default' => 'bullets'
			),
			'paginationColor' => array(
				'type' => 'string',
				'default' => '#999999'
			),
			'paginationActiveColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'enableNavigation' => array(
				'type' => 'boolean',
				'default' => true
			),
			'navigationColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'navigationSize' => array(
				'type' => 'number',
				'default' => 30
			),
			'enableAutoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'autoplayDelay' => array(
				'type' => 'number',
				'default' => 5000
			),
			'autoplayDisableOnInteraction' => array(
				'type' => 'boolean',
				'default' => true
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'effect' => array(
				'type' => 'string',
				'default' => 'slide'
			),
			'speed' => array(
				'type' => 'number',
				'default' => 300
			),
			'containerWidth' => array(
				'type' => 'string',
				'default' => '100%'
			),
			'containerMargin' => array(
				'type' => 'string',
				'default' => '0'
			),
			'containerPadding' => array(
				'type' => 'string',
				'default' => '0'
			),
			'slideHeight' => array(
				'type' => 'string',
				'default' => '320px'
			),
			'heightMode' => array(
				'type' => 'string',
				'default' => 'fixed'
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => '16/9'
			),
			'fullWidth' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
