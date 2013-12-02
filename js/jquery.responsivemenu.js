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
            toggleButtonClass: 'menu_toggle_button',
            toggleButtonNameClosed: '≡',
            toggleButtonNameOpen: '≡',
            toggleButtonLocation: 'before',
            subToggleClass: 'sub_toggle',
            subToggleNameClosed: '+',
            subToggleNameOpen: '-',
            subToggleLocation: 'after',
            classNameClosed: 'rm-closed',
            classNameOpen: 'rm-open',
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
        if(!$('div.' + settings.toggleButtonClass).length) {
            // Creating the toggle button
            var toggleButtonMarkup = '<div class="' + settings.toggleButtonClass + ' ' + settings.classNameClosed +'">' + settings.toggleButtonNameClosed + '</div>';
            if (settings.toggleButtonLocation == "after") {
                $(settings.menuElement).after(toggleButtonMarkup).parent().find('.' + settings.toggleButtonClass).accessibleHide();
            } else {
                $(settings.menuElement).before(toggleButtonMarkup).parent().find('.' + settings.toggleButtonClass).accessibleHide();
            }
        }


        // Check if the sub toggle buttons exists and if not create them
        if(!$('span.' + settings.subToggleClass).length) {
            // Creating the sub toggle buttons
            var subToggleMarkup = '<span class="' + settings.subToggleClass + ' ' + settings.classNameClosed + '">' + settings.subToggleNameClosed + '</span>';
            if (settings.subToggleLocation == "before") {
                $(settings.menuElement + ' li').has('ul').find('>a').before(subToggleMarkup).find('.' + settings.subToggleClass).accessibleHide();
            } else {
                $(settings.menuElement + ' li').has('ul').find('>a').after(subToggleMarkup).find('.' + settings.subToggleClass).accessibleHide();
            }
        }


        // Setting vars
        var menuElem = settings.menuElement,
            menuSubElem = settings.menuElement + ' ul',
            toggleButton = $('.' + settings.toggleButtonClass),
            subToggle = $('.' + settings.subToggleClass);


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

            // Set everything back to default
            toggleButton.removeClass(settings.classNameOpen).addClass(settings.classNameClosed).html(settings.toggleButtonNameClosed);
            subToggle.removeClass(settings.classNameOpen).addClass(settings.classNameClosed).html(settings.subToggleNameClosed);
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
                $(this).removeClass(settings.classNameClosed).addClass(settings.classNameOpen).html(settings.toggleButtonNameOpen);
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
                $(this).removeClass(settings.classNameOpen).addClass(settings.classNameClosed).html(settings.toggleButtonNameClosed);
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
                $(this).removeClass(settings.classNameOpen).addClass(settings.classNameClosed).html(settings.subToggleNameClosed);

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
                $(this).removeClass(settings.classNameClosed).addClass(settings.classNameOpen).html(settings.subToggleNameOpen);
            }
        });
    };

})(jQuery);