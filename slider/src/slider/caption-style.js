/** @type {string} */
export const CAPTION_POSITION_DEFAULT = 'bottom-center';

const CAPTION_INSET = '16px';

/**
 * Positioning for captions (per slide). Merged with typography from getCaptionInlineStyle.
 *
 * @param {string} position One of CAPTION_POSITION_VALUES.
 * @return {Object} CSS for position, inset, transform.
 */
export function getCaptionPositionStyle( position ) {
	const key =
		position && POSITION_STYLES[ position ]
			? position
			: CAPTION_POSITION_DEFAULT;
	return {
		position: 'absolute',
		margin: 0,
		...POSITION_STYLES[ key ],
	};
}

const POSITION_STYLES = {
	'top-left': {
		top: CAPTION_INSET,
		left: CAPTION_INSET,
		right: 'auto',
		bottom: 'auto',
		transform: 'none',
	},
	'top-center': {
		top: CAPTION_INSET,
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translateX(-50%)',
	},
	'top-right': {
		top: CAPTION_INSET,
		right: CAPTION_INSET,
		left: 'auto',
		bottom: 'auto',
		transform: 'none',
	},
	'center-left': {
		top: '50%',
		left: CAPTION_INSET,
		right: 'auto',
		bottom: 'auto',
		transform: 'translateY(-50%)',
	},
	center: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
	},
	'center-right': {
		top: '50%',
		right: CAPTION_INSET,
		left: 'auto',
		bottom: 'auto',
		transform: 'translateY(-50%)',
	},
	'bottom-left': {
		bottom: CAPTION_INSET,
		left: CAPTION_INSET,
		top: 'auto',
		right: 'auto',
		transform: 'none',
	},
	'bottom-center': {
		bottom: CAPTION_INSET,
		left: '50%',
		top: 'auto',
		right: 'auto',
		transform: 'translateX(-50%)',
	},
	'bottom-right': {
		bottom: CAPTION_INSET,
		right: CAPTION_INSET,
		top: 'auto',
		left: 'auto',
		transform: 'none',
	},
};

/**
 * Inline styles for slide captions (editor + saved markup).
 *
 * @param {Object} attrs                            Caption-related block attributes.
 * @param {number} [attrs.captionFontSize]
 * @param {string} [attrs.captionFontWeight]
 * @param {string} [attrs.captionFontFamily]
 * @param {string} [attrs.captionTextColor]
 * @param {string} [attrs.captionBackgroundColor]
 * @param {number} [attrs.captionBackgroundOpacity]
 * @param {string} [attrs.captionBorderRadius]
 * @return {Object} Style object for the caption element.
 */
export function getCaptionInlineStyle( {
	captionFontSize,
	captionFontWeight,
	captionFontFamily,
	captionTextColor,
	captionBackgroundColor,
	captionBackgroundOpacity,
	captionBorderRadius,
} ) {
	const fontSize = typeof captionFontSize === 'number' ? captionFontSize : 15;
	const opacityRaw =
		typeof captionBackgroundOpacity === 'number'
			? captionBackgroundOpacity
			: 60;
	const opacity = Math.min( 100, Math.max( 0, opacityRaw ) ) / 100;

	let backgroundColor = 'transparent';
	if ( opacity > 0 ) {
		backgroundColor = hexToRgba(
			captionBackgroundColor || '#000000',
			opacity
		);
	}

	const radiusKey = captionBorderRadius || 'pill';
	const borderRadius =
		radiusKey === 'pill'
			? '9999px'
			: `${ parseInt( radiusKey, 10 ) || 0 }px`;

	const style = {
		fontSize: `${ fontSize }px`,
		fontWeight: captionFontWeight || '400',
		color: captionTextColor || '#ffffff',
		backgroundColor,
		lineHeight: 1.4,
		borderRadius,
	};

	if ( captionFontFamily && captionFontFamily !== 'inherit' ) {
		style.fontFamily = captionFontFamily;
	}

	return style;
}

/**
 * @param {string} hex
 * @param {number} alpha 0–1
 * @return {string} rgba()
 */
function hexToRgba( hex, alpha ) {
	if ( ! hex || typeof hex !== 'string' ) {
		return `rgba(0, 0, 0, ${ alpha })`;
	}
	let h = hex.replace( '#', '' ).trim();
	if ( h.length === 3 ) {
		h = h
			.split( '' )
			.map( ( c ) => c + c )
			.join( '' );
	}
	if ( h.length !== 6 || Number.isNaN( parseInt( h, 16 ) ) ) {
		return `rgba(0, 0, 0, ${ alpha })`;
	}
	const r = parseInt( h.slice( 0, 2 ), 16 );
	const g = parseInt( h.slice( 2, 4 ), 16 );
	const b = parseInt( h.slice( 4, 6 ), 16 );
	return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
}
