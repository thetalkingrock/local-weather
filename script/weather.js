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
			
			$("#weather").text(data["weather"][0]["main"]);
			
			$("#humidity").text(data["main"]["humidity"] + "%");
			
			$("#wind-info").text(data["wind"]["speed"] + " mph " + convertDegreesToDirection(data["wind"]["deg"]));
			
			var weatherDescription = data["weather"][0]["main"];
			
			if(weatherDescription.toLowerCase().indexOf("rain") >= 0){
				$("body").css("background-image", "url(images/rain.jpg)");
			}else if(weatherDescription.toLowerCase().indexOf("cloud") >= 0){
				$("body").css("background-image", "url(images/cloudy.jpg)");
			}else if(weatherDescription.toLowerCase().indexOf("sun") >= 0){
				$("body").css("background-image", "url(images/sunny.jpg)")
			}
			
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
	
	function convertDegreesToDirection(windDirectionInDegrees){
		
		if((windDirectionInDegrees >= 348.75 && windDirectionInDegrees <= 360) || (windDirectionInDegrees >= 0) && windDirectionInDegrees <= 11.25){
			return "N";
		}
		else if(windDirectionInDegrees > 11.25 && windDirectionInDegrees <= 33.75){
			return "NNE";
		}
		else if(windDirectionInDegrees > 33.75 && windDirectionInDegrees <= 56.25){
			return "NE";
		}
		else if(windDirectionInDegrees > 56.25 && windDirectionInDegrees <= 78.75){
			return "ENE";
		}
		else if(windDirectionInDegrees > 78.75 && windDirectionInDegrees <= 101.25){
			return "E";
		}
		else if(windDirectionInDegrees > 101.25 && windDirectionInDegrees <= 123.75){
			return "ESE";
		}
		else if(windDirectionInDegrees > 123.75 && windDirectionInDegrees <= 146.25){
			return "SE";
		}
		else if(windDirectionInDegrees > 146.25 && windDirectionInDegrees <= 168.75){
			return "SSE";
		}
		else if(windDirectionInDegrees > 168.75 && windDirectionInDegrees <= 191.25){
			return "S";
		}
		else if(windDirectionInDegrees > 191.25 && windDirectionInDegrees <= 213.75){
			return "SSW";
		}
		else if(windDirectionInDegrees > 213.75 && windDirectionInDegrees <= 236.25){
			return "SW";
		}
		else if(windDirectionInDegrees > 236.25 && windDirectionInDegrees <= 258.75){
			return "WSW";
		}
		else if(windDirectionInDegrees > 258.75 && windDirectionInDegrees <= 281.25){
			return "W";
		}
		else if(windDirectionInDegrees > 281.25 && windDirectionInDegrees <= 303.75){
			return "WNW";
		}
		else if(windDirectionInDegrees > 303.75 && windDirectionInDegrees <= 326.25){
			return "NW";
		}
		else if(windDirectionInDegrees > 326.25 && windDirectionInDegrees <= 348.75){
			return "NNW";
		}
		
		
	}
	
});

//google map api key= AIzaSyAdK12U8IEM2GsHQpQUmadq4Ws5a_Ah0ko