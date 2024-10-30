<?php
_e($content);

$block_wrapper_attributes = get_block_wrapper_attributes()

?>

<div <?php echo ($block_wrapper_attributes) ?> data-wp-interactive="artedwa-carousel">
    <button data-wp-on--click="actions.decrementIndex">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6566 1.17824C13.1193 1.63301 13.1193 2.37034 12.6566 2.82511L4.04481 10.3807H22.8153C23.4696 10.3807 24 10.902 24 11.5452C24 12.1883 23.4696 12.7097 22.8153 12.7097H4.04481L12.6566 21.1748C13.1193 21.6296 13.1193 22.3669 12.6566 22.8217C12.194 23.2764 11.4439 23.2764 10.9812 22.8217L0.34699 12.3686C-0.115663 11.9139 -0.115663 11.1765 0.34699 10.7218L10.9812 1.17824C11.4439 0.723465 12.194 0.723465 12.6566 1.17824Z" fill="#111111" />
        </svg>
    </button>
    <button data-wp-on--click="actions.incrementIndex">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3434 1.17824C10.8807 1.63301 10.8807 2.37034 11.3434 2.82511L19.9552 10.3807H1.1847C0.530409 10.3807 0 10.902 0 11.5452C0 12.1883 0.530409 12.7097 1.1847 12.7097H19.9552L11.3434 21.1748C10.8807 21.6296 10.8807 22.3669 11.3434 22.8217C11.806 23.2764 12.5561 23.2764 13.0188 22.8217L23.653 12.3686C24.1157 11.9139 24.1157 11.1765 23.653 10.7218L13.0188 1.17824C12.5561 0.723465 11.806 0.723465 11.3434 1.17824Z" fill="#111111" />
        </svg>
    </button>
</div>