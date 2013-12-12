responsivemenu
==============

A jQuery plugin to create accessible responsive menus


Requires
-----------

jQuery


Installation
-----------
Load JavaScript file:

    <script type="text/javascript" src="js/jquery.responsivemenu.js"></script>

Initiate the menu
    
    <script type="text/javascript">
        $(document).ready(function(){
            $(".responsive-menu").responsiveMenu();
        });
    </script>

Load CSS file or add classes to your of CSS file
    
    <link rel="stylesheet" href="css/responsivemenu.css">
    
Add this to your page

    <body id="page" class="no-js">
    <script type="text/javascript">function hasClass(e,t){return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}var el=document.getElementById("page");var cl="no-js";if(hasClass(el,cl)){var reg=new RegExp("(\\s|^)"+cl+"(\\s|$)");el.className=el.className.replace(reg," js-enabled")}</script>
    
This makes sure that the menu will work both with and without JavaScript enabled. The reason the class toggle happens in regular JS is because that will be fired immediately. So submenus are hidden immediately with CSS instead of waiting for jQuery.



Properties
-----------

### menuElement:

The actual element that conatins the menu. Mostly &lt;ul&gt; elements.

__Default:__ this.selector

### toggleButtonClass:

Class name of the toggle button

__Default:__ 'menu_toggle_button'

### toggleButtonNameClosed:

Toggle button text when menu is closed

__Default:__ '≡'

### toggleButtonNameOpen:

Toggle button text when menu is open

__Default:__ '≡'

### toggleButtonLocation:

Place the toggle button before or after the menu element markup wise?

__Default:__ 'before'

### subToggleClass:

Class name of the sub toggle button (submenu items)

__Default:__ 'sub_toggle'

### subToggleNameClosed:

Sub toggle button text when children are closed

__Default:__ '+'

### subToggleNameOpen:

Sub toggle button text when children are open

__Default:__ '-'

### subToggleLocation:

Place the sub toggle button before or after the menu item title markup wise?

__Default:__ 'after'

### classNameClosed:

Class name to add to closed elements

__Default:__ 'rm-closed'

### classNameOpen:

Class name to add to opened elements

__Default:__ 'rm-open'

### mobileToDesktopSize:

Window width for mobile menu to become desktop menu

__Default:__ 600

### animations:

Slide animate the menus? Using slideDown but replacing display: none with a class so this stay accessible

__Default:__ true

### animationSpeed:

The speed of the animations

__Default:__ 200

### beforeMenuHide:

Run script before the menu hides

__Default:__ null

__Example:__ 
    
    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            beforeMenuHide: function() {
                alert('fired before the menu hides');
            }
        });
    });
    </script>

### afterMenuHide:

Run script right after the menu hides

__Default:__ null

__Example:__

    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            afterMenuHide: function() {
                alert('fired after the menu hides');
            }
        });
    });
    </script>


### beforeMainToggle:

Run script right before the main menu toggles

__Default:__ null

__Example:__

    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            beforeMainToggle: function() {
                alert('fired before the main menu toggles');
            }
        });
    });
    </script>

### afterMainToggle:

Run script right after the main menu toggles

__Default:__ null

__Example:__

    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            afterMainToggle: function() {
                alert('fired after the main menu toggles');
            }
        });
    });
    </script>

### beforeSubToggle:

Run script right before the sub menu toggles

__Default:__ null

__Example:__

    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            beforeSubToggle: function() {
                alert('fired before the sub menu toggles');
            }
        });
    });
    </script>

### afterSubToggle:

Run script right after the sub menu toggles

__Default:__ null

__Example:__

    <script type="text/javascript">
    $(document).ready(function(){
        $(".responsive-menu").responsiveMenu({
            afterSubToggle: function() {
                alert('fired after the main menu toggles');
            }
        });
    });
    </script>


In the wild
-----------

- [MariaPoppe.nl](http://www.mariapoppe.nl/)