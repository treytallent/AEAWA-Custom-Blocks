<?php
// Renders the wrapper for all tabs and their content
echo $content;
// echo $attributes;


function render_tab_component($attributes, $content)
{
    ob_start();
?>
    <div class="tab-component">
        <h4>Title</h4>
        <div class="tab-content">
            <?php echo $content; // Render inner blocks content 
            ?>
        </div>
    </div>
<?php
    return ob_get_clean();
}
