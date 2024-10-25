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

// Does not render the card if it's corresponding post type's category does not match the category of the panel it's placed inside of 
if ($category !== $parent_category) return
?>


<div <?php echo ($block_wrapper_attributes) ?>>
    <img src=<?php echo ($primary_image) ?>></img>
    <div>
        <h4 class="h2-small"><?php echo ($title) ?></h4>
        <div>
            <time class="body-small"><?php echo ($start_date) ?></time>
            <?php
            if (is_string($end_date) && strlen($end_date) > 0) {
                echo '<span>-</span><time class="body-small">' . $end_date . '</time>';
            }
            ?>
        </div>
        <p><?php echo ($short_event_description) ?></p>
        <a class="wp-block-button__link wp-element-button" href=<?php echo ($read_more_url) ?>>Read More</a>
    </div>
</div>