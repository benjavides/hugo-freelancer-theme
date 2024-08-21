/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        var href = $anchor.attr('href');
        var hash = href.split('#')[1];

        // Check if the current page is the language-specific root page
        var currentPath = window.location.pathname;
        var isRootPage = /^\/[a-z]{2}\/?$/.test(currentPath);
        
        if (isRootPage) {
            if (hash) {
                // If the hash exists, prevent default and scroll smoothly
                $('html, body').stop().animate({
                    scrollTop: $('#' + hash).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            }
        } else {
            // If not on the root page, navigate to the target href
            window.location.href = href;
        }
    });
});


// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
// $('body').scrollspy({
//     target: '.navbar-fixed-top'
// })

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


/** 
 * Open all external links in a new window
 */
jQuery(document).ready(function ($) {
    $('a')
        .filter('[href^="http"], [href^="//"]')
        .not('[href*="' + window.location.host + '"]')
        .attr('rel', 'noopener noreferrer')
        .attr('target', '_blank');
});