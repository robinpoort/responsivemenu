/* @preserve
 * Mobile first responsive menu
 * Copyright 2013 Robin Poort
 * http://www.robinpoort.com
 */

"use strict";

(function($) {

    $.responsiveMenu = function(element, options) {

        // Defaults
        var defaults = {
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
            animationSpeed: 200
        }

        // Plugin element
        var plugin = this;

        // Settings
        plugin.settings = {}

        // The element
        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;     // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            console.log( $(this).selector );

            // Merging default and user settings
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
                menuSubElem = $(plugin.settings.menuElement).find('li>ul'),
                toggleButton = $(menuElem).siblings('.' + plugin.settings.toggleButtonClass),
                subToggle = $(menuElem).find('.' + plugin.settings.subToggleClass);


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
                    if (subToggle.hasClass(plugin.settings.classNameClosed)) {
                        $(menuSubElem).accessibleHide();
                    }
                    if (subToggle.hasClass('accessible-hide')) {
                        subToggle.accessibleShow();
                    }
                }
                // If screen size is big
                if( bodyZIndex == 1 ) {
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

                // Set everything back to default
//                toggleButton.removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.toggleButtonNameClosed);
//                subToggle.removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.subToggleNameClosed);
            }


            // Run again on window resize and ready
            $(window).on('resize ready', function(event) {
                // Get the window width or get the body width as a fallback
                var width = event.target.innerWidth || $('body').width(),
                    bodyZIndex = $('body').css('z-index');
                toggleButtons(width, bodyZIndex);
                addBodyClass(width, bodyZIndex);
            });

            // Use the toggle button
            toggleButton.click(function() {
                // Before Main toggle
                if (plugin.settings.beforeMainToggle) { plugin.settings.beforeMainToggle(); }

                if ($(menuElem).hasClass('accessible-hide')) {
                    if (plugin.settings.animations == true) {
                        $(menuElem).accessibleShow();
                        $(menuElem).hide().slideDown(plugin.settings.animationSpeed, function() {
                            $(menuElem).removeAttr('style');
                            // After Main toggle
                            $(window).trigger('resize');
                            if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                        });
                    } else {
                        $(menuElem).accessibleShow();
                        // After Main toggle
                        $(window).trigger('resize');
                        if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                    }
                    $(toggleButton).removeClass(plugin.settings.classNameClosed).addClass(plugin.settings.classNameOpen).html(plugin.settings.toggleButtonNameOpen);
                } else {
                    // Animate the menu?
                    if (plugin.settings.animations == true) {
                        $(menuElem).slideUp(plugin.settings.animationSpeed, function() {
                            $(menuElem).removeAttr('style');
                            $(menuElem).accessibleHide();
                            // After Main toggle
                            $(window).trigger('resize');
                            if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                        });
                    } else {
                        $(menuElem).accessibleHide();
                        // After Main toggle
                        $(window).trigger('resize');
                        if (plugin.settings.afterMainToggle) { plugin.settings.afterMainToggle(); }
                    }
                    $(toggleButton).removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.toggleButtonNameClosed);
                }
            });

            // Use the sub toggle button
            subToggle.click(function() {
                // Before Sub toggle
                if (plugin.settings.beforeSubToggle) { plugin.settings.beforeSubToggle(); }

                if ($(this).siblings('ul:not(.accessible-hide)').length) {
                    // Animate the menu?
                    if (plugin.settings.animations == true) {
                        $(this).siblings('ul').slideUp(plugin.settings.animationSpeed, function() {
                            $(this).removeAttr('style').accessibleHide();
                            // After Sub toggle
                            $(window).trigger('resize');
                            if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                        });
                    } else {
                        $(this).siblings('ul').accessibleHide();
                        // After Sub toggle
                        $(window).trigger('resize');
                        if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                    }
                    $(this).removeClass(plugin.settings.classNameOpen).addClass(plugin.settings.classNameClosed).html(plugin.settings.subToggleNameClosed);
                } else if ($(this).siblings('ul').hasClass('accessible-hide')) {
                    // Animate the menu?
                    if (plugin.settings.animations == true) {
                        $(this).siblings('ul').accessibleShow();
                        $(this).siblings('ul').hide().slideDown(plugin.settings.animationSpeed, function() {
                            $(this).removeAttr('style');
                            // After Sub toggle
                            $(window).trigger('resize');
                            if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                        });
                    } else {
                        $(this).siblings('ul').accessibleShow();
                        // After Sub toggle
                        $(window).trigger('resize');
                        if (plugin.settings.afterSubToggle) { plugin.settings.afterSubToggle(); }
                    }
                    $(this).removeClass(plugin.settings.classNameClosed).addClass(plugin.settings.classNameOpen).html(plugin.settings.subToggleNameOpen);
                }
            });
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
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.responsiveMenu(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                $(this).data('responsiveMenu', plugin);

            }
        });
    }

})(jQuery);