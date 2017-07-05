
var animId;
var $h = $("#headlines");
var $curLeft = $h.offset().left;
var $a =  $("a:first-child");
var $aWidth = $a.outerWidth();

$h.on('mouseover', function() {
    cancelAnimationFrame(animId);
    console.log("mouseover");
}).mouseout(moveLinks);


function moveLinks(){
    console.log("mouseout");
    if ($curLeft < 300) {
        $curLeft -= 1;
        var firstLink = $a;
        if($curLeft <= -$aWidth){
            $h.append($a);
            $a =  $("a:first-child");
            $curLeft = $curLeft + $aWidth;
            $aWidth = $a.outerWidth();
        }
    }
    $h.css({
        left : $curLeft + "px"
    })
    animId = requestAnimationFrame(moveLinks);
}

moveLinks();
