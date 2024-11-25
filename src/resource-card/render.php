<?php
$post_id = get_the_ID();
$post_url = get_permalink($post_id);
$title = get_field('resource-fields-title', $post_id);
$short_resource_description = get_field('resource-fields-short-description', $post_id);
$primary_image = get_field('resource-fields-img', $post_id);
$block_wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo ($block_wrapper_attributes) ?>>
    <img src=<?php echo ($primary_image) ?>></img>
    <div class="card-container">
        <h3 class="has-26-36-s-font-size"><?php echo ($title) ?></h4>
            <p><?php echo ($short_resource_description) ?></p>
            <div class="wp-block-button is-style-secondary card-button-end">
                <a class="wp-block-button__link wp-element-button" href=<?php echo ($post_url) ?>>Read More</a>
            </div>
    </div>
</div>