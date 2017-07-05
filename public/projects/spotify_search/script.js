$(document).on('click', "#more-button", function(){
    getData(nextUrl);
});

var nextUrl;
var currentItems = []
$("#go-button").click(infoQuery);



function infoQuery(){
    var selectValue = $("#select").val();
    var textValue = $("#text-value").val();
    if(selectValue == "artist"){
        var resultFor = '<p>You are looking for the artist "'+textValue+'"</p>';
    }else {
        var resultFor = '<p>You are looking for the albums by "'+textValue+'" or containing the "'+textValue+'" occurence</p>';
    }
    $("#result-for").html(resultFor);
    $("#section1 div").html("");

    getData();

}

function getData(url){
    var textValue = $("#text-value").val();
    var selectValue = $("#select").val();
    var section1 = $("#section1 .container");
    var moreButton = $("#more-button");
    var endMessage = $('#end-message');
    var moreClicked = url;

    if(!url){
        var url = 'http://elegant-croissant.glitch.me/spotify?q='+ textValue +'&type=' + selectValue;
    }

    $.ajax({
        url : url,
        method : 'GET',

        success: function(data) {
            var resultsHtml = "";
            data = data.artists || data.albums;
            console.log(data);
            var items = data.items;
            items.forEach(function(item) {

                resultsHtml += "<div class='spotify-content'>";
                resultsHtml += '<a href="'+item.external_urls.spotify+'">'+item.name+'</a>'

                if(item.images[0]){
                    resultsHtml += '<img src="'+item.images[0].url+'"/>'
                }else {
                    resultsHtml += '<img src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif"/>'
                }
                resultsHtml += '<p id="break"></p>';
                resultsHtml += "</div>";

            })

            nextUrl = data.next;

            console.log(data);

            if(nextUrl != null){
                nextUrl = nextUrl.replace('api.spotify.com/v1/search', 'elegant-croissant.glitch.me/spotify')
                moreButton.addClass("show-more");
                endMessage.html("");
                if(!interval){
                    infiniteScroll();
                }
            }else if(data.items.length + data.offset === data.total || data.total < data.limit ){
                endMessage.html("");
                moreButton.removeClass("show-more");
                endMessage.append(data.total + ' results for " '+ textValue+'"');
            }else{
                moreButton.removeClass("show-more");
            }

            if(moreClicked){
                section1.append(resultsHtml);
            }else {
                section1.html(resultsHtml);
            }


        }
    })

    var interval;

    function infiniteScroll(){

        interval =  setInterval(callback, 500);

        function callback(){
            if($(document).scrollTop() + $(window).height() === $(document).height() ){
                clearInterval(interval);
                interval = null;
                $("#more-button").html("loading");
                if(nextUrl){
                    getData(nextUrl);
                }
            }
        }
    }
}
