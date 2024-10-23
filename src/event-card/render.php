<?php

$post_id = get_the_ID();
$title = get_the_title($post_id);
$short_event_description = get_field('short_event_description', $post_id);
$primary_image = get_field('primary_image', $post_id);
$start_date = get_field('start_date', $post_id);
$end_date = get_field('end_date', $post_id);
$end_date = get_field('end_date', $post_id);
$read_more_url = get_field('read_more_url', $post_id);
$category = get_field('category', $post_id);
$parent_category = $attributes["category"];
$block_wrapper_attributes = get_block_wrapper_attributes();

if (is_array($category) && !empty($category)) {
    $category = $category[0]->name;
}

_e($category);
_e($parent_category);

if ($category === $parent_category) {
    echo wp_sprintf(
        '<div %1$s>
            <img src="%2$s"></img>
            <h4>%3$s</h4>
            <div>
                <p>%4$s</p>
                <p>%5$s</p>
            </div>
            <p>%6$s</p>
            <a href="%7$s">Read More</a>
        </div>',
        $block_wrapper_attributes,
        $primary_image,
        $title,
        $start_date,
        $end_date,
        $short_event_description,
        $read_more_url
    );
}
