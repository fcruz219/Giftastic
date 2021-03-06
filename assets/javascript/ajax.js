
// INTIAL BUTTON -------------------
var myData = ["Ace Ventura", "It's Always Sunny In Philadelphia", "Dumb and Dumber", "Step Brothers", "Bob's Burgers", 
"Silicon Valley", "Superbad", "Anchorman", "Billy Madison", "Eric Andre"]


// START DOCUMENT------------------
$(document).ready(function(){
    $("#images").hide();
    renderButton();

    // Function to make the buttons
    function renderButton(){
        $("#buttons").empty();

        // Runs through my array
        for (var i=0; i< myData.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-success");
            newButton.text(myData[i]);
            newButton.attr("data-name", myData[i]);
            $("#buttons").append(newButton);
        }
    }

    // Adds the new button to the page
    $("#addbutton").on("click", function(event){
        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if(addedData != "") {
            myData.push(addedData);
            renderButton();
            $("#userinput").val();
        }
    })




//On click of buttons to show gifs
$(document).on("click", ".itembutton", displayInfo);
function displayInfo() {
    var itemName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + itemName + "&rating=g&limit=10&api_key=VN2gTSbvqkCHuWEkunZhZyKoVYYxm6mk";
    $("#images").empty();
    $("#images").show()


    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        //creates gifs
        for (var i=0; i< results.length; i++) {
            var dataImage = $("<img>");
            dataImage.attr("src", results[i].images.fixed_height_still.url);
            dataImage.attr("data-animate", results[i].images.fixed_height.url);
            dataImage.attr("data-still", results[i].images.fixed_height_still.url);
            dataImage.addClass("gif");
            dataImage.attr("data-state", "still");

            var newItemdiv = $('<div class="newItem">');
            var gifRating = results[i].rating;
            var divRating = $("<p>").text("Rating: " + gifRating);
            
            newItemdiv.append(divRating);
            newItemdiv.append(dataImage);

            $("#images").prepend(newItemdiv);

        }
    })
}
//pauses and unpauses the gifs
$("#images").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
})

});