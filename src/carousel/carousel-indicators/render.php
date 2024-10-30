<?php
$indicators = ($attributes["indicators"]);
$block_wrapper_attributes = get_block_wrapper_attributes();

?>

<div <?php echo $block_wrapper_attributes ?> data-wp-interactive="artedwa-carousel">
    <?php
    foreach ($indicators as $indicator) {
        echo sprintf(
            '<button data-wp-context=%s data-wp-on--click=%s data-wp-class--is-active=%s>
        </button>',
            $indicator["id"],
            'actions.setActive',
            'actions.isActive'
        );
    } ?>
</div>