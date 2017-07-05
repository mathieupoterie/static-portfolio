(function() {
    var menuImg = document.getElementById('menu-img');
    var hamburgerContainer = document.getElementById('hamburger-container');
    var cross = document.getElementById('cross');
    var whiteMenu = document.getElementById("menu-background");
    var overlay = document.getElementById('grey-overlay');

    function menuAppear() {
        hamburgerContainer.classList.add('show');
    }

    function menuDisappear(a) {
        a.stopPropagation();
        hamburgerContainer.classList.remove('show');
    }

    menuImg.addEventListener('click',menuAppear);
    cross.addEventListener('click',menuDisappear);
    overlay.addEventListener('click',menuDisappear)

    setTimeout(function () {
        $( "#modal-container" ).addClass( "show-modal" );
    }, 1000);

 $("#modal-overlay, #modal-cross").on('click', function (e) {
    e.stopPropagation();
    $( "#modal-container" ).removeClass( "show-modal" );
 })

})();
