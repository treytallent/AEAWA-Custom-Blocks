<?php
$indicators = ($attributes["indicators"]);
$block_wrapper_attributes = get_block_wrapper_attributes();

?>

<div <?php echo $block_wrapper_attributes ?> data-wp-interactive="aeawa-carousel">
    <?php
    foreach ($indicators as $indicator) {
        $context = array(
            'id' => $indicator["id"]
        );

        $contextAppend = 'data-wp-context="' . esc_attr(wp_json_encode($context)) . '"';

        echo sprintf(
            '<button %1$s data-wp-on--click=%2$s data-wp-class--is-active=%3$s>
        </button>',
            $contextAppend,
            'actions.setActive',
            'actions.isActive'
        );
    } ?>
</div>