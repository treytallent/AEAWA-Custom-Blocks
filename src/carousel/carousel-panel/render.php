<?php
$post_id = get_the_ID();

$context = [
    'postId' => $post_id,
];

$short_name = get_field('short_event_name', $post_id);
$short_event_description = get_field('short_event_description', $post_id);
$long_event_description = get_field('long_event_description', $post_id);
$event_description = !empty($long_event_description) ? $long_event_description : $short_event_description;
$read_more_url = get_field('read_more_url', $post_id);
$primary_image = get_field('primary_image', $post_id);
?>

<div <?php echo get_block_wrapper_attributes() ?> data-wp-interactive="aeawa-carousel" <?php echo wp_interactivity_data_wp_context($context) ?> data-wp-init="callbacks.initPane" data-wp-watch="callbacks.setContext" data-wp-class--is-active="context.isActive">
    <?php echo $content ?>
</div>