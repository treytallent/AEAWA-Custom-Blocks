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
	register_block_type_from_metadata(__DIR__ . '/build/sample-block');
}

add_action('init', 'artedwa_blocks_artedwa_block_init');
