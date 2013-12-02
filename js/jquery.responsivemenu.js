"use strict";

/*
 * Mobile first responsive menu
 * Copyright 2013 Robin Poort
 * http://www.robinpoort.com
 */

(function ($) {

    $.fn.responsiveMenu = function(options) {

        // Options
        var settings = $.extend(true, {
            // Default values
            menuElement: this.selector,
            toggleButton: 'menu_toggle_button',
            toggleButtonName: '≡',
            toggleButtonLocation: 'before',
            subToggle: 'sub_toggle',
            subToggleName: '+',
            subToggleLocation: 'after',
            mobileToDesktopSize: 600,
            animations: true,
            animationSpeed: 200,
            beforeMenuHide: null,
            afterMenuHide: null,
            beforeMainToggle: null,
            afterMainToggle: null,
            beforeSubToggle: null,
            afterSubToggle: null
        }, options);


        // Accessible show and hide functions
        $.fn.accessibleHide = function() {
            this.addClass('accessible-hide');
        }
        $.fn.accessibleShow = function() {
            this.removeClass('accessible-hide');
        }


        // Check if the main toggle button exists and if not create it
        if(!$('div.' + settings.toggleButton).length) {
            // Creating the toggle button
            var toggleButtonMarkup = '<div class="' + settings.toggleButton + '">' + settings.toggleButtonName + '</div>';
            if (settings.toggleButtonLocation == "after") {
                $(settings.menuElement).after(toggleButtonMarkup).parent().find('.' + settings.toggleButton).accessibleHide();
            } else {
                $(settings.menuElement).before(toggleButtonMarkup).parent().find('.' + settings.toggleButton).accessibleHide();
            }
        }


        // Check if the sub toggle buttons exists and if not create them
        if(!$('span.' + settings.subToggle).length) {
            // Creating the sub toggle buttons
            var subToggleMarkup = '<span class="' + settings.subToggle + '">' + settings.subToggleName + '</span>';
            if (settings.subToggleLocation == "before") {
                $(settings.menuElement + ' li').has('ul').find('>a').before(subToggleMarkup).find('.' + settings.subToggle).accessibleHide();
            } else {
                $(settings.menuElement + ' li').has('ul').find('>a').after(subToggleMarkup).find('.' + settings.subToggle).accessibleHide();
            }
        }


        // Setting vars
        var menuElem = settings.menuElement,
            menuSubElem = settings.menuElement + ' ul',
            toggleButton = $('.' + settings.toggleButton),
            subToggle = $('.' + settings.subToggle);


        // Add appropriate body class
        function addBodyClass(width) {
            if(width < settings.mobileToDesktopSize ) {
                $('body').removeClass('menu-unfolded').addClass('menu-folded');
            } else {
                $('body').removeClass('menu-folded').addClass('menu-unfolded');
            }
        }


        // Toggle button action
        function toggleButtons(width) {
            // Before Menu Hide
            if (settings.beforeMenuHide) { settings.beforeMenuHide(); }
            // If screen size is small
            if(width < settings.mobileToDesktopSize ) {
                // Main toggle
                $(menuElem).accessibleHide();
                if (toggleButton.hasClass('accessible-hide')) {
                    toggleButton.accessibleShow();
                }
                // Sub toggle
                $(menuSubElem).accessibleHide();
                if (subToggle.hasClass('accessible-hide')) {
                    subToggle.accessibleShow();
                }
            }
            // If screen size is big
            if(width >= settings.mobileToDesktopSize ) {
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
            if (settings.afterMenuHide) { settings.afterMenuHide(); }
        }


        // Run again on window resize and ready
        $(window).on('resize ready', function(event) {
            // Get the window width or get the body width as a fallback
            var width = event.target.innerWidth || $('body').width();
            toggleButtons(width);
            addBodyClass(width);
        });


        // Use the toggle button
        toggleButton.click(function() {
            // Before Main toggle
            if (settings.beforeMainToggle) { settings.beforeMainToggle(); }

            if ($(menuElem).hasClass('accessible-hide')) {
                $(menuElem).accessibleShow();
                if (settings.animations == true) {
                    $(menuElem).hide().slideDown(settings.animationSpeed, function() {
                        $(menuElem).removeAttr('style');
                        // After Main toggle
                        if (settings.afterMainToggle) { settings.afterMainToggle(); }
                    });
                }
            } else {
                // Animate the menu?
                if (settings.animations == true) {
                    $(menuElem).slideUp(settings.animationSpeed, function() {
                        $(window).trigger('resize');
                        $(menuElem).removeAttr('style');
                        $(menuElem).accessibleHide();
                        // After Main toggle
                        if (settings.afterMainToggle) { settings.afterMainToggle(); }
                    });
                } else {
                    $(menuElem).accessibleHide();
                }
            }
        });

        // Use the sub toggle button
        subToggle.click(function() {
            // Before Sub toggle
            if (settings.beforeSubToggle) { settings.beforeSubToggle(); }

            if ($(this).siblings('ul:not(.accessible-hide)').length) {
                // Animate the menu?
                if (settings.animations == true) {
                    $(this).siblings('ul').slideUp(settings.animationSpeed, function() {
                        $(this).removeAttr('style').accessibleHide();
                        // After Sub toggle
                        if (settings.afterSubToggle) { settings.afterSubToggle(); }
                    });
                } else {
                    $(this).siblings('ul').accessibleHide();
                }
            } else if ($(this).siblings('ul').hasClass('accessible-hide')) {
                $(this).siblings('ul').accessibleShow();
                // Animate the menu?
                if (settings.animations == true) {
                    $(this).siblings('ul').hide().slideDown(settings.animationSpeed, function() {
                        $(this).removeAttr('style');
                        // After Sub toggle
                        if (settings.afterSubToggle) { settings.afterSubToggle(); }
                    });
                }
            }
        });
    };

})(jQuery);