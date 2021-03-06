$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) { //
        e.preventDefault();
        $(document).off("scroll");
        
        $('a .dot').each(function () {
            $(this).removeClass('active');
        })
        // $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#sidelink-dot a').each(function () {
        var currLink = $(this);
        var refElement = $(this.hash); 
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#sidelink-dot a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
    $('#sidelink a').each(function () {
        var currLink = $(this);
        var refElement = $(this.hash); 
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            // $('#sidelink a').removeClass("active");
            // currLink.addClass("active");
        }
        else{
            // currLink.removeClass("active");
        }
    });
    
}
