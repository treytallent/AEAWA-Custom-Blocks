<?php

$post_id = get_the_ID();
$title = get_the_title($post_id);

_e($title);
