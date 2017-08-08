$(document).ready(function(){
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(gotLocation, displayErrorMessage);
	}else{
		displayErrorMessage();
	}
	
	function gotLocation(position){
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;
		var codeCampJSON = $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude
		 + "&lon=" + longitude, function (data) {
			$("#temp").text(Math.round(data["main"]["temp"]) + $("#temp").text() + " ");
		});
		var googleJSON = $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + "AIzaSyAdK12U8IEM2GsHQpQUmadq4Ws5a_Ah0ko", function (data) {
				
				var cityName = data["results"][0]["address_components"][2]["long_name"];
				var stateName = data["results"][0]["address_components"][4]["short_name"];
				$("#main-container").css("visibility", "visible");
				$("#city-name").text(cityName + ", " + stateName);
		});
	}
	function displayErrorMessage(){
		$("#main-container").css("visibility", "visible");
		$("h1").text("Location could not be accessed");	
	}
	
});

//google map api key= AIzaSyAdK12U8IEM2GsHQpQUmadq4Ws5a_Ah0ko