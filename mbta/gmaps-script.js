function init() {
        //Map centered around South Station
        var map_origin = new google.maps.LatLng(42.352271, -71.05524200000001)

        // Set up map
	var myOptions = {
		zoom: 8,
		center: map_origin,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var infowindow = new google.maps.InfoWindow();

}
