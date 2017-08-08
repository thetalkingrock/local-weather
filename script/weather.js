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
			$("#city-and-temp").prepend("<h4>" + Math.round(data["main"]["temp"]) + "&deg;" + " C" + "</h4>");
		});
		var googleJSON = $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + "AIzaSyAdK12U8IEM2GsHQpQUmadq4Ws5a_Ah0ko", function (data) {
				
				var cityName = data["results"][0]["address_components"][2]["long_name"];
				var stateName = data["results"][0]["address_components"][4]["short_name"];
				$("#main-container").css("visibility", "visible");
				$("#city-and-temp").prepend("<h3>" + cityName + ", " + stateName + "</h3>");
		});
		
		
		//var addressComponents = googleJSON["results"];
		//console.log(typeof addressComponents);
		/*	
		var cityFound = false;
		var cityName = "";
		for(var x = 0; x < addressComponents.length; x++){
			if(addressComponents[x]["types"] === "locality"){
				cityFound = true;
				cityName = addressComponents[x]["short_name"];
			}
		}
		if(cityFound){
			$("#city-name").text(cityName);
		}else{
			$("h1").text("Unable to find city");
		}
		$("#main-container").css("visibility", "visible");
		*/
	}
	function displayErrorMessage(){
		$("#main-container").css("visibility", "visible");
		$("h1").text("Location could not be accessed");	
	}
	
});

//google map api key= AIzaSyAdK12U8IEM2GsHQpQUmadq4Ws5a_Ah0ko