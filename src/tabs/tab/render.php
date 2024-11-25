<?php

$id = $attributes["id"];
$icon = $attributes["icon"];
$title = $attributes["title"];

$block_wrapper_attributes = get_block_wrapper_attributes(
    array(
        'data-wp-interactive' => 'aeawa',
        'data-wp-context' => wp_json_encode(array('id' => $id)),
        'data-wp-class--active' => 'actions.isActive',
        'data-wp-on--click' => "actions.setActive"
    )
);
?>

<button <?php echo ($block_wrapper_attributes) ?>>
    <?php echo ($icon) ?>
    <h2 class="has-18-28-font-size"><?php echo ($title) ?></h3>
</button>