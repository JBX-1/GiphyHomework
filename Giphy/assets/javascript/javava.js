$(function(){
    buttonChoice(choices,'searchButton','#buttons');

})

var choices = ["Africa","UnitedStates","Russia","China"];
//stores buttons on page
function buttonChoice(arraychoices,cTA,aTAT){
    $(aTAT).empty();
    for(var i=0;i<arraychoices.length;i++) {
        var a = $('<button>');
        a.addClass(cTA);
        a.attr('data-type',choices[i]);
        a.text(arraychoices[i]);
        $(aTAT).append(a);

    }
}
//click Button
$(document).on('click','.searchButton', function(){
    $("#subButton").removeClass("active");
    $(this).addClass("active");
//giphy API
    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=Hbt0tE2J1GMpRuSQ2GoyPqZKS2KJsyFd&limit=10";


    $.ajax({url:queryURL,
        method:"GET"})
    .done(function(response){
        //loop from still to animated
        for(var i =0;i<response.data.length;i++){
            var searchDiv = $('<div class="search-item">');
// rating
            var rating = response.data[i].rating;
            var p= $('<p>').text('rating: '+rating);

            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
//
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animate', animated);
            image.attr('data-state','still');
            image.addClass('search-input');
            //prepend when clicked
            searchDiv.prepend(p);
            searchDiv.prepend(image);
            $('#searches').prepend(searchDiv);
        }
    })
    
})
// still and animate
$(".search-input").on('click', function(){
    var state = $(this).attr('data-state');

    if(state == 'still'){
        $(this).attr('src',$(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
})

//add new input
$('#subButton').on('click', function(){
    var newChoice = $('input').eq(0).val();
    if(newChoice.length > 2){
    choices.push(newChoice);
    }
    buttonChoice(choices,'searchButton', '#buttons');
    return false;

})







