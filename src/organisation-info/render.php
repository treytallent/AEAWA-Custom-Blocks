<?php

$post_id = get_the_ID();
$title = get_the_title($post_id);
$primary_image = get_field('primary_image', $post_id);
$organisation_url = get_field('organisation_url', $post_id);
$block_wrapper_attributes = get_block_wrapper_attributes();

?>

<a <?php echo ($block_wrapper_attributes) ?> href="<?php echo $organisation_url ?>">
    <img src=<?php echo ($primary_image) ?>></img>
    <h3 class="label-bold"><?php echo ($title) ?></h4>
</a>