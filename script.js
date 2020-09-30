//api key: 2963b1a903afecfd4fe05baa6523f8be


$("#search").on("click", function() {


var cityName = $("#cityName").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2963b1a903afecfd4fe05baa6523f8be"   

$.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
      console.log(response);

      $("#currentCity").text(response.name);
      $("#temp").text("Temperature: " + response.main.temp);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#wind").text("Wind Speed: " + response.wind.speed);
    //  $("#uv").val(response.main.humidity);

  });

});
