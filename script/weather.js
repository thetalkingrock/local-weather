$(document).ready(function(){
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(gotLocation, displayErrorMessage);
	}else{
		displayErrorMessage();
	}
	
	function gotLocation(position){
		$("h1").css("visibility", "visible");
		$("h1").html("Location accessed");
	}
	
	function displayErrorMessage(){
		$("h1").css("visibility", "visible");
		$("h1").html("Location could not be accessed");	
	}
	
});