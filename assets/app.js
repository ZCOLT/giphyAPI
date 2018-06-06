console.log("yo");

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you.Save it to a variable called topics.
var topics = ["dog", "cat", "bird"];

// We chose animals
// for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.

// Try using a loop that appends a button
// for each string in the array.
function genButtons() {
  $("#buttons").empty()
  for(var i = 0; i < topics.length; i++){
    var button = $(`<button id="gifButton">${topics[i]}</button>`)
    // .css("background-color", "teal", "color", "white")
    $("#buttons").append(button);
  }
}
genButtons()


$("#buttons").on("click", "#gifButton", function (event) {
  event.preventDefault();

  $("#gifs").empty()

  var buttonValue = $(this).text()
  console.log(buttonValue);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    buttonValue + "&api_key=U5jJLunRRj84WUFRNc94M32W4ygx9Rnp&limit=10&rating=g";

  // When the user clicks on a button, the page should grab 10 static, non - animated gif images from the GIPHY API and place them on the page.
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(gifData){
    console.log(gifData);
    console.log(gifData.data[0].images.fixed_height_still.url)
    for (var i = 0; i < gifData.data.length; i++){
      var img = $('<img></img>')
      img.attr("src", gifData.data[i].images.fixed_height_still.url)
      img.attr("data-still", gifData.data[i].images.fixed_height_still.url)
      img.attr("data-animated", gifData.data[i].images.fixed_height.url)
      img.attr("data-state", "still")
      img.attr("id", "gifImg")


      $('#gifs').append(img)

    }

  })

})

$("#gifs").on("click", "#gifImg", function (event) {
  var img = $(this)
    var stillImg = img.attr("data-still");
    console.log(stillImg);
  var animatedImg = img.attr("data-animated");
  console.log(animatedImg);
  var state = img.attr("data-state")
  console.log(state);
  if(state == "still"){
    img.attr("src", animatedImg);
    img.attr("data-state", "animated")
  }else{
    img.attr("src", stillImg);
    img.attr("data-state", "still")
  }
})

$("#submit").on("click", function (event) {
  event.preventDefault();
  var userInput = $("#addAnimal").val().trim()
  topics.push(userInput)
  genButtons()
  $("#addAnimal").val("")
})

// When the user clicks one of the still GIPHY images, the gif should animate.If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating(PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array.Then make a
// function call that takes each topic in the array remakes the buttons on the page.

// Deploy your assignment to Github Pages.