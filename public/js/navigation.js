$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('isActive');
});

$('.toggle.toggle-nav').on('click touchend', function (event) {
    $('.site-navigation').addClass('toggle');
    $(this).addClass('isActive');
    $('#main').addClass('toggle');
    $('body').addClass('hasOverlay');
    return false;
});

$('#close').on("click touchend", function () {
    $('.site-navigation').removeClass('toggle');
    $('.toggle.toggle-nav').removeClass('isActive');
    $('#main').removeClass('toggle');
    $('body').removeClass('hasOverlay');
});