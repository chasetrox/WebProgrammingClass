//Map centered around South Station
var map_origin = new google.maps.LatLng(42.352271, -71.05524200000001);

// Map options
var myOptions = {
        zoom: 12,
        center: map_origin,
        mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Station geolocations organized into an unordered array of associative objects
var stations = {
'South Station' : { 'lat': 42.352271,   'lng': -71.05524200000001,  'next': 'Broadway'},
'Andrew'        : { 'lat': 42.330154,   'lng':          -71.057655, 'next': 'JFK/UMass'},
'Porter Square' : { 'lat':     42.3884, 'lng':  -71.11914899999999, 'next': 'Harvard Square'},
'Harvard Square': { 'lat':   42.373362, 'lng':          -71.118956, 'next': 'Central Square'},
'JFK/UMass'     : { 'lat':   42.320685, 'lng':          -71.052391, 'next': 'North Quincy'},
'Savin Hill'    : { 'lat' :    42.31129,'lng':          -71.053331, 'next': 'JFK/UMass'},
'Park Street'   : { 'lat': 42.35639457, 'lng':         -71.0624242, 'next': 'Downtown Crossing'},
'Broadway'      : { 'lat':   42.342622, 'lng':          -71.056967, 'next': 'Andrew'},
'North Quincy'  : { 'lat' :   42.275275,'lng':          -71.029583, 'next': 'Wollaston'},
'Shawmut'       : { 'lat': 42.29312583, 'lng':  -71.06573796000001, 'next': 'Fields Corner'},
'Davis'         : { 'lat':    42.39674, 'lng':          -71.121815, 'next': 'Porter Square'},
'Alewife'       : { 'lat' :   42.395428, 'lng':         -71.142483, 'next': 'Davis'},
'Kendall/MIT'   : { 'lat': 42.36249079, 'lng':        -71.08617653, 'next': 'Charles/MGH'},
'Charles/MGH'   : { 'lat':   42.361166, 'lng':          -71.070628, 'next': 'Park Street'},
'Downtown Crossing':{'lat':42.355518,   'lng':          -71.060225, 'next': 'South Station'},
'Quincy Center' : { 'lat':   42.251809, 'lng':          -71.005409, 'next': 'Quincy Adams'},
'Quincy Adams'  : { 'lat':   42.233391, 'lng':          -71.007153, 'next': 'Braintree'},
'Ashmont'       : { 'lat':   42.284652, 'lng':  -71.06448899999999, 'next': 'Shawmut'},
'Wollaston'     : { 'lat':  42.2665139, 'lng':         -71.0203369, 'next': 'Quincy Center'},
'Fields Corner': { 'lat':   42.300093, 'lng':          -71.061667, 'next': 'Savin Hill'},
'Central Square': { 'lat':   42.365486, 'lng':          -71.103802, 'next': 'Kendall/MIT'},
'Braintree'     : { 'lat':  42.2078543, 'lng':         -71.0011385, 'next': 'Ashmont'}
};

/* Client function, initializes map, draws markers/red line */
function init() {
        //Defines variable map as a new entity inside the div ID'd "map canvas"
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        place_markers(map);
        draw_red_line(map);
}

/* Iterates through stops and places custom icon'ed markers */
function place_markers(map) {
        // Defines a closed downward arrow as our marker icon
        var icon = {path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        strokeColor: 'red'};

        //Iterates through stops, draws marker at lng/lat on the map
        for (var stop in stations) {
                if (stations.hasOwnProperty(stop)) {
                        var lat = stations[stop]['lat'];
                        var lng = stations[stop]['lng'];
                        var pos = new google.maps.LatLng(lat, lng);
                        marker = new google.maps.Marker({
                                        icon: icon,
					position: pos,
					title: stop
				});
			marker.setMap(map);
                }
        }
}

/* Iterates through 'linked list' table structure and draws a line between
   each stop on the red line until it reaches Savin Hill. */
function draw_red_line(map) {
        var finished = false;
        var curr = 'Alewife';

        while (!finished) {
                var stop = stations[curr];

                /* Array with coordinates for path b/w two stops */
                var pathCoords = [];
                pathCoords.push({lat: stop['lat'], lng: stop['lng']})
                pathCoords.push({lat: stations[stop['next']]['lat'],
                           lng: stations[stop['next']]['lng']});

                if (stop['next'] != 'Ashmont') {
                        var line = new google.maps.Polyline({
                            path: pathCoords,
                            strokeColor: '#FF0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                          });
                        line.setMap(map);
                }


                if (curr == 'Savin Hill') finished = true;
                curr = stop['next'];
        }
}
