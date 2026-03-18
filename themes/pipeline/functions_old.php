<?php
function pipeline_theme_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'pipeline'),
    ));
}
add_action('after_setup_theme', 'pipeline_theme_setup');

function pipeline_scripts() {
    wp_enqueue_style('pipeline-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'pipeline_scripts');
?>