//api key: 2963b1a903afecfd4fe05baa6523f8be

$(document).ready(function() {
var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

//on-click function for search bar, adding searched cities to local storage
$("#search").on("click", function() {

  let cityName = $("#cityName").val();


  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName)
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
  }

    recentSearches();
    forecastClick(cityName);
    searchClick(cityName);

});


//search function for current weather
function searchClick(cityName) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=2963b1a903afecfd4fe05baa6523f8be",
    method: "GET"
  })

  //adding values to html from response and setting lat/lon coordinates
  .then(function(response) {
      //console.log(response);

      let lat = response.coord.lat
      let lon = response.coord.lon

      localStorage.setItem("latitude", lat),
      localStorage.setItem("longitude", lon)

      var mainIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"

      $("#currentCity").text(response.name);
      $("#mainIcon").attr("src", mainIcon);
      $("#temp").text("Temperature: " + response.main.temp + " °F");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
      
      localStorage.getItem("latitude");
      localStorage.getItem("longitude");
    
    //ajax call to uv index api for current city using lat/lon
      $.ajax({
      url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2963b1a903afecfd4fe05baa6523f8be",
      method: "GET"
      })
  
      //adding uv data to html
      .then(function(response) {
        //console.log(response);
  
        $("#uv").text("UV Index: " + response.value);
        let uv2 = response.value

      //categorizing uv by color
      $("#uvColor").removeClass("low moderate high");

        if (uv2 <= 3) {
          $("#uvColor").addClass("low");
        } else if (uv2 > 3 && uv2 <= 6) {
          $("#uvColor").addClass("moderate");
        } else {
          $("#uvColor").addClass("high");
        }
      }); 
    });
}


//make buttons for each recent search
function recentSearches() {
  $("#search-button").empty()
    for (let i=0; i < searchHistory.length; i++) {
      let button = $("<button>").html(searchHistory[i])
      button.addClass("cityBtn")
      $("#search-button").append(button);
    }
}

$(document).on("click", "button.cityBtn", function() {
  var newButton = $(this).text()
  searchClick(newButton);
  forecastClick(newButton);
})


//function to call 5 day forecast api and add values to corresponding html
function forecastClick(cityName) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=2963b1a903afecfd4fe05baa6523f8be",
    method: "GET"
  })

  .then(function(response) {
    //console.log(response);
    

    let iconUrl1 = "http://openweathermap.org/img/w/" + response.list[7].weather[0].icon + ".png";
    let iconUrl2 = "http://openweathermap.org/img/w/" + response.list[15].weather[0].icon + ".png";
    let iconUrl3 = "http://openweathermap.org/img/w/" + response.list[23].weather[0].icon + ".png";
    let iconUrl4 = "http://openweathermap.org/img/w/" + response.list[31].weather[0].icon + ".png";
    let iconUrl5 = "http://openweathermap.org/img/w/" + response.list[39].weather[0].icon + ".png";

    let currentDate = moment().format("MMMM Do YYYY");
    
    $("#currentDate").text(currentDate);
    $("#date1").text(response.list[7].dt_txt);
    $("#date2").text(response.list[15].dt_txt);
    $("#date3").text(response.list[23].dt_txt);
    $("#date4").text(response.list[31].dt_txt);
    $("#date5").text(response.list[39].dt_txt);

    $("#icon1").attr("src", iconUrl1);
    $("#icon2").attr("src", iconUrl2);
    $("#icon3").attr("src", iconUrl3);
    $("#icon4").attr("src", iconUrl4);
    $("#icon5").attr("src", iconUrl5);

    $("#daily-temp1").text("Temp: " + response.list[7].main.temp + " °F");
    $("#daily-temp2").text("Temp: " + response.list[15].main.temp + " °F");
    $("#daily-temp3").text("Temp: " + response.list[23].main.temp + " °F");
    $("#daily-temp4").text("Temp: " + response.list[31].main.temp + " °F");
    $("#daily-temp5").text("Temp: " + response.list[39].main.temp + " °F");

    $("#daily-hum1").text("Humidity: " + response.list[7].main.humidity + "%");
    $("#daily-hum2").text("Humidity: " + response.list[15].main.humidity + "%");
    $("#daily-hum3").text("Humidity: " + response.list[23].main.humidity + "%");
    $("#daily-hum4").text("Humidity: " + response.list[31].main.humidity + "%");
    $("#daily-hum5").text("Humidity: " + response.list[39].main.humidity + "%");
  });
  
}

//loading last searched city on page load
function startPage() {
  var lastItem = searchHistory.pop();
  searchClick(lastItem);
  forecastClick(lastItem);
}

window.onLoad = startPage();

recentSearches();
})

let newThing = response.list[0].dt;
    let newThing2 = newThing.toString();

    console.log(newThing2.toISOString());