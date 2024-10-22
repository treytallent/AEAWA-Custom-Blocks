<?php

$id = $attributes["id"];
$category = $attributes["category"];

$block_wrapper_attributes = get_block_wrapper_attributes(
    array(
        'data-wp-interactive' => 'artedwa',
        'data-wp-context' => wp_json_encode(array('id' => $id)),
        'data-wp-bind--hidden' => '!actions.isActive',
        'data-wp-class--is-active' => 'actions.isActive',
    )
);

echo wp_sprintf(
    '<section %1$s>%2$s<p>%3$s</p></section>',
    $block_wrapper_attributes,
    $content,
    $category
);
