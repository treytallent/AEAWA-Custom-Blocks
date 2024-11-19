<?php

$post_id = get_the_ID();
$title = get_field('event-fields-title', $post_id);
$short_event_description = get_field('event-fields-short-description', $post_id);
$primary_image = get_field('event-fields-img', $post_id);
$start_date = get_field('event-fields-start-date', $post_id);
$end_date = get_field('event-fields-end-date', $post_id);
$read_more_url = get_field('event-fields-url', $post_id);
$category = get_field('category', $post_id);
$parent_category = $attributes["category"];
$block_wrapper_attributes = get_block_wrapper_attributes();

if (is_array($category) && !empty($category)) {
    $category = $category[0]->name;
}
?>

<div <?php echo ($block_wrapper_attributes) ?>>
    <img src=<?php echo ($primary_image) ?>></img>
    <div class="card-container">
        <h3 class="has-26-36-s-font-size"><?php echo ($title) ?></h4>
            <div class="card-time">
                <time class="has-black-light-color has-14-20-font-size"><?php echo ($start_date) ?></time>
                <?php
                if (is_string($end_date) && strlen($end_date) > 0) {
                    echo '<span>-</span><time class="has-black-light-color has-14-20-font-size">' . $end_date . '</time>';
                }
                ?>
            </div>
            <p><?php echo ($short_event_description) ?></p>
            <div class="wp-block-button is-style-secondary card-button-end">
                <a class="wp-block-button__link wp-element-button" href=<?php echo ($read_more_url) ?>>Read More</a>
            </div>
    </div>
</div>