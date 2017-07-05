(function(){
    var animId;
    var h = document.getElementById('headlines');
    var curLeft = h.offsetLeft;
    function moveLinks(){
        if (curLeft < 300) {
            curLeft -= 1;
            var aWidth = document.querySelector('a').offsetWidth;
            if(curLeft <= -aWidth){
                var firstLink = document.querySelector('a')
                h.appendChild(firstLink);
                curLeft = curLeft + aWidth;
            }
            h.style.left = curLeft + 'px';
            animId = requestAnimationFrame(moveLinks);
        }
    }

    moveLinks();

    document.getElementById("headlines").onmouseover = function() {mouseOver()};
    document.getElementById("headlines").onmouseout = function() {mouseOut()};

    function mouseOver() {
        cancelAnimationFrame(animId);
    }

    function mouseOut() {
        moveLinks();
    }
})();
