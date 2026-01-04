$(document).ready(function() {

    // Dynamically set height based on content
    $('.info-box').each(function() {
        var $front = $(this).find('.info-box-front');
        var $back = $(this).find('.info-box-back');
        
        // Temporarily remove absolute positioning to measure height
        $front.css('position', 'static');
        $back.css('position', 'static');
        
        // Get max height and width
        var frontHeight = $front.outerHeight();
        var backHeight = $back.outerHeight();
        var maxHeight = Math.max(frontHeight, backHeight);

        var frontWidth = $front.outerWidth();
        var backWidth = $back.outerWidth();
        var maxWidth = Math.max(frontWidth, backWidth);
        
        // Restore absolute positioning
        $front.css('position', 'absolute');
        $back.css('position', 'absolute');
        
        // Set the height
        $(this).height(maxHeight);
        $front.height(maxHeight).width(maxWidth);
        $back.height(maxHeight).width(maxWidth);

        // Set background images from data attributes
        var backgroundImage = $(this).data("bgImage");
        var $back = $(this).find('.info-box-back');
        $back.css('--bg-image', 'url(' + backgroundImage + ')');
    });

// data-bgImage = "https://locicerohealth.com/wp-content/uploads/2025/04/20250414_LoCicero_190.jpg"

    $('.menu-item-transform').on('mouseenter', function(e) {

        var $box = $(this).find('.info-box');
        var w = $(this).width();
        var h = $(this).height();
        
        // Calculate entry point
        var x = (e.pageX - $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

        // Get back of info box
        var $back = $box.find('.info-box-back');
        var $front = $box.find('.info-box-front');
        var $text = $box.find('.info-box-text');

        // Apply rotation based on entry
        switch(direction) {
            case 0: // Top
                $box.css('transform', 'rotateX(-180deg)'); 
                $back.toggleClass('rotated-background');
                $text.toggleClass('rotate');

                break;

            case 1: // Right
                $box.css('transform', 'rotateY(180deg)');  
                $back.toggleClass('background');
                break;

            case 2: // Bottom
                $box.css('transform', 'rotateX(180deg)');
                $back.toggleClass('rotated-background');
                $text.toggleClass('rotate');
                break; 

            case 3: // Left
                $box.css('transform', 'rotateY(-180deg)'); 
                $back.toggleClass('background');
                break;
        }
    });

    $('.menu-item-transform').on('mouseleave', function() {

        $(this).find('.info-box-back').removeClass('rotated-background');

        $(this).find('.info-box-text').removeClass('rotated-text');

        $(this).find('.info-box-back').removeClass('background');

        $(this).find('.info-box-text').removeClass('rotate');

        $(this).find('.info-box').css('transform', 'rotateY(0deg) rotateX(0deg)');
    });

});