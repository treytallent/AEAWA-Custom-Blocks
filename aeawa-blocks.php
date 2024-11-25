<?php

/**
 * Plugin Name:       AEAWA Blocks
 * Description:       Handles custom blocks for AEAWA.
 * Version:           0.1.0
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            MESH
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aeawa
 *
 * @package           aeawa-blocks
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function aeawa_blocks_aeawa_block_init()
{
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tabs-wrapper');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tabs-list');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/tab');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/panels-list');
	register_block_type_from_metadata(__DIR__ . '/build/tabs/panel');
	register_block_type_from_metadata(__DIR__ . '/build/event-card');
	register_block_type_from_metadata(__DIR__ . '/build/carousel/carousel-wrapper');
	register_block_type_from_metadata(__DIR__ . '/build/carousel/carousel-panel');
	register_block_type_from_metadata(__DIR__ . '/build/carousel/carousel-wrapper');
	register_block_type_from_metadata(__DIR__ . '/build/carousel/carousel-controls');
	register_block_type_from_metadata(__DIR__ . '/build/carousel/carousel-indicators');
	register_block_type_from_metadata(__DIR__ . '/build/scrolling-carousel');
	register_block_type_from_metadata(__DIR__ . '/build/organisation-info');
	register_block_type_from_metadata(__DIR__ . '/build/link-wrapper');
	register_block_type_from_metadata(__DIR__ . '/build/resource-card');
}
add_action('init', 'aeawa_blocks_aeawa_block_init');
