

var coin = $("#coin");
var curPlayer = "player1";
var allSlots = $(".slot");


function getColClass($elem) {
    if ($elem.hasClass('column1')) {
        return '.column1';
    } else if ($elem.hasClass('column2')) {
        return '.column2'
    }else if ($elem.hasClass('column3')) {
        return '.column3 '
    } else if ($elem.hasClass('column4')) {
        return '.column4'
    } else if ($elem.hasClass('column5')) {
        return '.column5'
    } else if ($elem.hasClass('column6')) {
        return '.column6'
    } else if ($elem.hasClass('column7')) {
        return '.column7'
    }
}

$('.slot').on('click', function(e) {

    var slots = $(getColClass($(e.target)));
    var slot;

    for (var i = 5; i >= 0; i--) {
        slot = slots.eq(i);

        if (!slot.hasClass('player1') && !slot.hasClass('player2')) {
            slot.addClass(curPlayer);
            break;
        }

    }

    if (haveAWinner()){
        return
    }else {
        if (curPlayer == 'player1') {
            $("#p1").css({
                display : 'none'
            });
            curPlayer = "player2";
            $("#p2").css({
                display : 'block'
            })
            coin.css({
                backgroundColor : 'red',
                border :'none'
            })
        } else if (curPlayer == 'player2'){
            $("#p2").css({
                display : 'none'
            });
            curPlayer ="player1";
            $("#p1").css({
                display : 'block'
            })
            coin.css({
                backgroundColor : 'yellow',
                border :'none'
            })
        }
    }

})

function haveAWinner(){

    var winner = column();
    if(!winner){
        winner = row();
        if (!winner) {
            winner = diagonale();
        }
    } return winner;

    function column(){

        var cols = [
            $(".column1"),
            $(".column2"),
            $(".column3"),
            $(".column4"),
            $(".column5"),
            $(".column6"),
            $(".column7"),
        ];


        var count;
        for(var i = 0; i < cols.length; i++){
            count = 0;


            for(var j = 0; j < cols[i].length; j++){

                if (cols[i].eq(j).hasClass(curPlayer)) {
                    count ++;
                }else {
                    count = 0;
                }
                if(count >= 4) {
                    console.log("column");
                    setTimeout(anim, 1000);
                    return true
                }
            }


        }
    };


    function row(){

        var rows = [
            $(".row1"),
            $(".row2"),
            $(".row3"),
            $(".row4"),
            $(".row5"),
            $(".row6"),
        ]


        var count;
        for(var i = 0; i < rows.length; i++){
            count = 0;

            for(var j = 0; j < rows[i].length; j++){

                if (rows[i].eq(j).hasClass(curPlayer)) {
                    count ++;
                }else {
                    count = 0;
                }

                if(count >= 4) {
                    console.log("win row");
                    setTimeout(anim, 1000);
                    return true
                }
            }
        }
    }


    function diagonale(){


        var rows = [
            $(".row1"),
            $(".row2"),
            $(".row3"),
            $(".row4"),
            $(".row5"),
            $(".row6"),
        ]


        var count;
        for(var i = 0; i < rows.length; i++){
            count = 0;

            for(var j = 0; j < 4; j++){

                if(i >= 3){

                    var upAndToRight = [
                        rows[i].eq(j),
                        rows[i - 1].eq(j + 1),
                        rows[i - 2].eq(j + 2),
                        rows[i - 3].eq(j + 3)
                    ];

                    count = 0;

                    for (var a = 0; a< 4; a++){

                        if(upAndToRight[a].hasClass(curPlayer)){

                            count++;

                        }if(count >= 4) {
                            //console.log("win upright");
                            setTimeout(anim, 1000);
                            return true
                            //determine if we have a winner.
                        }
                    }

                }else if(i < 4){

                    var downRight = [
                    rows[i].eq(j),
                    rows[i + 1].eq(j + 1),
                    rows[i + 2].eq(j + 2),
                    rows[i + 3].eq(j + 3)
                    ];
                    count = 0;


                    for (var a = 0; a < 4; a++){
                        if(downRight[a].hasClass(curPlayer)){ // c'est cette ligne qui ne functionne pas.
                            count++;

                        }

                        if(count >= 4) {
                            setTimeout(anim, 1000);
                            return true
                        }
                    }
                }
            }
        }
    }
}



//CALLBACK WIN

function anim() {
    console.log(curPlayer);
    if(curPlayer == "player1"){
        $(".win-message1").removeClass("hidden").addClass("victory1");
        console.log("coucou");
    }else{
        $(".win-message2").removeClass("hidden").addClass("victory2");
    }
    allSlots.removeClass("player1");
    allSlots.removeClass("player2");

    setTimeout(function(){
        if(curPlayer == "player1"){
            $(".win-message1").removeClass("victory1").addClass("hidden");
        }else{
            $(".win-message2").removeClass("victory2").addClass("hidden");
        }

        $("#p2").css({
            display : 'none'
        });
        curPlayer ="player1";
        $("#p1").css({
            display : 'block'
        })
        coin.css({
            backgroundColor : 'yellow',
            border :'none'
        })

    }, 2000);
}

//
// $("#coin").on('mousemove',focus);
//
//
// function focus(e){
//     e.stopPropagation();
//     var player = e.target;
//     var x = e.pageX;
//     var y = e.pageY;
//
//     player.style.left =  x +"px";
//     player.style.top = y + "px";
//     player.style.transform = ('translate(-50%, -50%)')
//
// }
//
// coin.on('click', function(e){
//     var player = e.target;
//     player.style.left =  "3px";
//     player.style.top = "3px";
//     player.style.transform = ('translate(0%)')
//     return;
// })
