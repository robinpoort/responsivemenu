/* @preserve
 * Mobile first responsive menu
 * Copyright 2013 Robin Poort
 * http://www.robinpoort.com
 */

"use strict";

(function($) {

    $.responsiveMenu = function(element, options) {

        var defaults = {
            parentElement: $(element).parent(),
            menuElement: $(element),
            toggleButtonClass: 'menu_toggle_button',
            toggleButtonNameClosed: '≡',
            toggleButtonNameOpen: '≡',
            toggleButtonLocation: 'before',
            subToggleClass: 'sub_toggle',
            subToggleNameClosed: '+',
            subToggleNameOpen: '-',
            subToggleLocation: 'after',
            subToggleListClass: 'rm-subMenu',
            classNameClosed: 'rm-closed',
            classNameOpen: 'rm-open',
            animations: true,
            animationSpeed: 200,
            clickAside: false,
            keyboard: false
        },
            plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            // Accessible show and hide functions
            $.fn.accessibleHide = function() {
                this.addClass('accessible-hide');
            }
            $.fn.accessibleShow = function() {
                this.removeClass('accessible-hide');
            }

            // Check if the main toggle button exists and if not create it
            if( !$(plugin.settings.toggleButtonClass).length ) {
                // Creating the toggle button
                var toggleButtonMarkup = '<div class="' + plugin.settings.toggleButtonClass + ' ' + plugin.settings.classNameClosed +'">' + plugin.settings.toggleButtonNameClosed + '</div>';
                if (plugin.settings.toggleButtonLocation == "after") {
                    $(plugin.settings.menuElement).after(toggleButtonMarkup).parent().find('.' + plugin.settings.toggleButtonClass).accessibleHide();
                } else {
                    $(plugin.settings.menuElement).before(toggleButtonMarkup).parent().find('.' + plugin.settings.toggleButtonClass).accessibleHide();
                }
            }

            // Check if the sub toggle buttons exists and if not create them
            if( !$(plugin.settings.subToggleClass).length ) {
                // Creating the sub toggle buttons
                var subToggleMarkup = '<span class="' + plugin.settings.subToggleClass + ' ' + plugin.settings.classNameClosed + '">' + plugin.settings.subToggleNameClosed + '</span>';
                if (plugin.settings.subToggleLocation == "before") {
                    $(plugin.settings.menuElement).find('li').has('ul').find('>a').before(subToggleMarkup).find(plugin.settings.subToggleClass).accessibleHide();
                } else {
                    $(plugin.settings.menuElement).find('li').has('ul').find('>a').after(subToggleMarkup).find(plugin.settings.subToggleClass).accessibleHide();
                }
            }


            // Setting vars
            var menuElem = plugin.settings.menuElement,
                menuSubElem = $(menuElem).find('li>ul'),
                toggleButton = $(menuElem).siblings('.' + plugin.settings.toggleButtonClass),
                subToggle = $(menuElem).find('.' + plugin.settings.subToggleClass),
                animationSpeed = plugin.settings.animationSpeed;

            // Set the animationspeed to 1 if animations are not being used
            if ( plugin.settings.animations == false ) {
                animationSpeed = 1;
            }


            // Add appropriate classes
            function addBodyClass(width, bodyZIndex) {
                if( bodyZIndex == 0 ) {
                    $('body').removeClass('menu-unfolded').addClass('menu-folded');
                } else {
                    $('body').removeClass('menu-folded').addClass('menu-unfolded');
                }
            }


            // Toggle button action
            function toggleButtons(width, bodyZIndex) {
                // Before Menu Hide
                if (plugin.settings.beforeMenuHide) { plugin.settings.beforeMenuHide(); }
                // If screen size is small
                if( bodyZIndex == 0 ) {
                    // Main toggle
                    if (toggleButton.hasClass(plugin.settings.classNameClosed)) {
                        $(menuElem).accessibleHide();
                    }
                    if (toggleButton.hasClass('accessible-hide')) {
                        toggleButton.accessibleShow();
                    }
                    // Sub toggle
                    if (!subToggle.hasClass(plugin.settings.classNameOpen)) {
                        $(menuSubElem).accessibleHide();
                    }
                    if (subToggle.hasClass('accessible-hide')) {
                        subToggle.accessibleShow();
                    }
                }
                // If screen size is big
                if( bodyZIndex == 1 ) {

                    // Setting submenus to hide as standard when getting back smaller
                    subToggle.removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.subToggleNameClosed);

                    // Main toggle
                    $(menuElem).accessibleShow();
                    toggleButton.accessibleHide();

                    // Sub toggle
                    if ($(menuSubElem).hasClass('accessible-hide')) {
                        $(menuSubElem).accessibleShow();
                    }
                    subToggle.accessibleHide();
                }
                // After Menu Hide
                if (plugin.settings.afterMenuHide) { plugin.settings.afterMenuHide(); }
            }


            // Run again on window resize and ready
            $(window).on('resize ready', function(event) {
                // Get the window width or get the body width as a fallback
                var width = event.target.innerWidth || $('body').width(),
                    bodyZIndex = $('body').css('z-index');
                // Functions
                toggleButtons(width, bodyZIndex);
                addBodyClass(width, bodyZIndex);
            });

            function showMainLevel() {
                $(menuElem).accessibleShow();
                $(menuElem).hide().slideDown(animationSpeed, function() {
                    $(menuElem).removeAttr('style');
                    // After Main toggle
                    if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                    $(window).trigger('resize');
                });
                $(toggleButton).removeClass(plugin.settings.classNameClosed).addClass(plugin.settings.classNameOpen).html(plugin.settings.toggleButtonNameOpen);
            }

            function hideMainLevel() {
                $(menuElem).slideUp(animationSpeed, function() {
                    $(menuElem).removeAttr('style');
                    $(menuElem).accessibleHide();
                    // After Main toggle
                    if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                    $(window).trigger('resize');
                });
                $(toggleButton).removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.toggleButtonNameClosed);
            }

            function showSubLevel(subElem) {
                subElem.siblings('ul').accessibleShow();
                subElem.siblings('ul').hide().slideDown(animationSpeed, function() {
                    $(this).removeAttr('style');
                    // After Sub toggle
                    if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                    $(window).trigger('resize');
                });
                subElem.removeClass(plugin.settings.classNameClosed).addClass(plugin.settings.classNameOpen).html(plugin.settings.subToggleNameOpen);
            }

            function hideSubLevel(subElem) {
                subElem.siblings('ul').slideUp(animationSpeed, function() {
                    $(this).removeAttr('style').accessibleHide();
                    // After Sub toggle
                    if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                    $(window).trigger('resize');
                });
                subElem.removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.subToggleNameClosed);
            }

            // Use the toggle button
            toggleButton.click(function() {
                // Before Main toggle
                if (plugin.settings.beforeMainToggle) { plugin.settings.beforeMainToggle(); }
                if ($(menuElem).hasClass('accessible-hide')) {
                    showMainLevel();
                } else {
                    hideMainLevel();
                }
            });

            // Use the sub toggle button
            subToggle.click(function() {
                // Before Sub toggle
                if (plugin.settings.beforeSubToggle) { plugin.settings.beforeSubToggle(); }
                if ($(this).siblings('ul:not(.accessible-hide)').length) {
                    var subElem = $(this);
                    hideSubLevel(subElem);
                } else if ($(this).siblings('ul').hasClass('accessible-hide')) {
                    var subElem = $(this);
                    showSubLevel(subElem);
                }
            });

            // Clicking outside of the menu area to close all open menus
            if ( plugin.settings.clickAside == true ) {
                $(document).click(function() {
                    // Before Main toggle
                    if (plugin.settings.beforeMainToggle) { plugin.settings.beforeMainToggle(); }
                    // Hide the menu
                    if (!$(menuElem).hasClass('accessible-hide')) {
                        hideMainLevel();
                    }
                });

                plugin.settings.parentElement.add(plugin.settings.menuElement).add('.menu_toggle_button').click(function(event){
                    event.stopPropagation();
                });
            }

            // Using the esc key to close all open menus
            if ( plugin.settings.keyboard == true ) {
                $(document).bind('keydown', function(e) {
                    if (e.which == 27) {
                        hideMainLevel();
                    }
                });
            }
        }

        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.responsiveMenu = function(options) {
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('responsiveMenu')) {
                // create a new instance of the plugin
                var plugin = new $.responsiveMenu(this, options);
                // in the jQuery version of the element
                // store a reference to the plugin object
                $(this).data('responsiveMenu', plugin);
            }
        });
    }

})(jQuery);