;
(function($){
    $.fn.extend({
        myBgc:function(color){
            return $(this).css('background-color', color);
        }
    });
})(jQuery);