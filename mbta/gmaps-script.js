/*Station geolocations organized into an unordered array of associative objects*/

var stations = {'South Station' : {'long': 42.352271, 'lat': -71.05524200000001},
'Andrew' : { 'long': 42.330154, 'lat':          -71.057655},
'Porter Square' : { 'long':     42.3884, 'lat':  -71.11914899999999},
'Harvard Square' : { 'long':   42.373362, 'lat':          -71.118956},
'JFK/UMass' : { 'long':   42.320685, 'lat':          -71.052391},
'Savin Hill'  ,  'long':    42.31129, 'lat':          -71.053331},
'Park Street' : { 'long': 42.35639457, 'lat':         -71.0624242},
'Broadway' : { 'long':   42.342622, 'lat':          -71.056967},
'North Quincy'  ,  'long':   42.275275, 'lat':          -71.029583},
'Shawmut' : { 'long': 42.29312583, 'lat':  -71.06573796000001},
'Davis' : { 'long':    42.39674, 'lat':          -71.121815},
'Alewife' :'{long':   42.395428, 'lat':          -71.142483},
'Kendall/MIT' : { 'long': 42.36249079, 'lat':        -71.08617653},
'Charles/MGH' : { 'long':   42.361166, 'lat':          -71.070628},
'Downtown Crossing' : { 'long':   42.355518, 'lat':          -71.060225},
'Quincy Center' : { 'long':   42.251809, 'lat':          -71.005409},
'Quincy Adams' : { 'long':   42.233391, 'lat':          -71.007153},
'Ashmont' : { 'long':   42.284652, 'lat':  -71.06448899999999},
'Wollaston' : { 'long':  42.2665139, 'lat':         -71.0203369},
'Fields Corner ' : { 'long':   42.300093, 'lat':          -71.061667},
'Central Square' : { 'long':   42.365486, 'lat':          -71.103802},
'Braintree' : { 'long':  42.2078543, 'lat':         -71.0011385}};




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

        place_markers(map);
}
