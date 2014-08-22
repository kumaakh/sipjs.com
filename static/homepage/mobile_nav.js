(function () {

var drawerShrunkHeight = '0';
var drawerExpandHeight = '20vw';
var menuOpen = false;
var showDelay = 150;
var hideDelay = 400;
var hideFunc = (function () {
    if (!menuOpen)
        $('#drawer-nav').css('visibility', 'hidden');
});
var showFunc = (function () {
    if (menuOpen)
        $('#drawer-nav').css('visibility', 'visible');
})

$('#mobile-menu').click(function (e) {
    if (!menuOpen) {
        menuOpen = true;
        $('#drawer-nav').css('height', drawerExpandHeight);
        setTimeout(showFunc, showDelay);
    } else {
        menuOpen = false;
        $('#drawer-nav').css('height', drawerShrunkHeight);
        setTimeout(hideFunc, hideDelay);
    }
});

document.addEventListener('click', function (event) {
    // Tests if we clicked outside of the menu button
    if ($('#mobile-nav').css('display') !== 'none'
        && $(event.target).closest('#mobile-menu').length === 0
        && $(event.target).closest('#drawer-nav').length === 0) {
        menuOpen = false;
        $('#drawer-nav').css('height', drawerShrunkHeight);
        setTimeout(hideFunc, hideDelay);
    }
});


$(window).resize(function (event) {
    if (window.innerWidth > 700) {
        menuOpen = false;
        $('#drawer-nav').removeAttr('style');
        $('#drawer-list').removeAttr('style');
    }
});

})();