(function() {

    var i = 0;
    var isTransitioning;
    var timer = setTimeout(slide, 2000);
    var kitties = document.getElementsByClassName('kitty');
    var dot = document.getElementsByClassName("dot");



    document.addEventListener("click", function(e) {
        if (isTransitioning){
            return;
        }
        if (e.target.classList.contains("dot")) {
            for (var j = 0; j < dot.length; j++) {
                if (e.target == dot[j] && j != i) {
                    clearTimeout(timer);
                    slide(j);
                }
            }
        }
    });

    function slide(index) {
        console.log(index);

        kitties[i].classList.remove("on-screen");
        kitties[i].classList.add("exit-left");
        dot[i].classList.remove("dot-active");
        dot[i].classList.add("dot-inactive");

        if (typeof index === "number") {
            i = index;
        }
        else if  (i+1 < kitties.length) {
            i = i+1;
        } else {
            i = 0;
        }

        kitties[i].classList.remove("off-right");
        kitties[i].classList.add("on-screen");
        dot[i].classList.remove("dot-inactive");
        dot[i].classList.add("dot-active");

        isTransitioning = true;

    }

    document.addEventListener("transitionend", function(e) {
        var o = 0;
        console.log('hi' + o++);
        if (e.target.classList.contains("exit-left")) {
            e.target.classList.remove("exit-left");
            e.target.classList.add("off-right");
            isTransitioning = false;
            timer = setTimeout(slide, 2000);
        }

    })

})();
