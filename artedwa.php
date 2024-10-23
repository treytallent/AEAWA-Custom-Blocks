<?php

/**
 * Plugin Name:       ArtEdWA Plugin
 * Description:       Handles custom blocks for ArtEdWA.
 * Version:           0.1.0
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            MESH
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       artedwa
 *
 * @package           artedwa-blocks
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function artedwa_blocks_artedwa_block_init()
{
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tabs-wrapper');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tabs-list');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tab');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/panels-list');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/panel');
	register_block_type_from_metadata(__DIR__ . '/build/event-card');
}

add_action('init', 'artedwa_blocks_artedwa_block_init');

function enqueue_custom_store_script()
{
	wp_enqueue_script(
		'custom-store', // Handle for the script
		get_template_directory_uri() . '/src/sample-block/sample-store.js', // Path to the script
		array('wp-data'),
	);
}

// add_action('wp_enqueue_scripts', 'enqueue_custom_store_script');

// Allow SVG
add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename, $mimes) {

	global $wp_version;
	if ($wp_version !== '4.7.1') {
		return $data;
	}

	$filetype = wp_check_filetype($filename, $mimes);

	return [
		'ext'             => $filetype['ext'],
		'type'            => $filetype['type'],
		'proper_filename' => $data['proper_filename']
	];
}, 10, 4);

function cc_mime_types($mimes)
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

function fix_svg()
{
	echo '<style type="text/css">
		  .attachment-266x266, .thumbnail img {
			   width: 100% !important;
			   height: auto !important;
		  }
		  </style>';
}
add_action('admin_head', 'fix_svg');
