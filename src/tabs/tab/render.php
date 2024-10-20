<?php

$id = $attributes["id"];
$icon = $attributes["icon"];
$title = $attributes["title"];

$block_wrapper_attributes = get_block_wrapper_attributes(
    array(
        'data-wp-interactive' => 'artedwa',
        'data-wp-context' => wp_json_encode(array('id' => $id)),
        'data-wp-class--is-active' => 'actions.isActive',
        'data-wp-on--click' => "actions.setActive"
    )
);


echo wp_sprintf(
    '<button %1$s>
    %2$s
    %3$s
    </button>',
    $block_wrapper_attributes,
    $icon,
    $title,
);
