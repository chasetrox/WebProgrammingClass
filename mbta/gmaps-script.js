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
'South Station' : { lat: 42.352271,   lng: -71.05524200000001,  next: 'Broadway'},
'Andrew'        : { lat: 42.330154,   lng:          -71.057655, next: 'JFK/UMass'},
'Porter Square' : { lat:     42.3884, lng:  -71.11914899999999, next: 'Harvard Square'},
'Harvard Square': { lat:   42.373362, lng:          -71.118956, next: 'Central Square'},
'JFK/UMass'     : { lat:   42.320685, lng:          -71.052391, next: 'North Quincy'},
'Savin Hill'    : { lat :    42.31129,lng:          -71.053331, next: 'JFK/UMass'},
'Park Street'   : { lat: 42.35639457, lng:         -71.0624242, next: 'Downtown Crossing'},
'Broadway'      : { lat:   42.342622, lng:          -71.056967, next: 'Andrew'},
'North Quincy'  : { lat :   42.275275,lng:          -71.029583, next: 'Wollaston'},
'Shawmut'       : { lat: 42.29312583, lng:  -71.06573796000001, next: 'Fields Corner'},
'Davis'         : { lat:    42.39674, lng:          -71.121815, next: 'Porter Square'},
'Alewife'       : { lat :   42.395428, lng:         -71.142483, next: 'Davis'},
'Kendall/MIT'   : { lat: 42.36249079, lng:        -71.08617653, next: 'Charles/MGH'},
'Charles/MGH'   : { lat:   42.361166, lng:          -71.070628, next: 'Park Street'},
'Downtown Crossing':{lat:42.355518,   lng:          -71.060225, next: 'South Station'},
'Quincy Center' : { lat:   42.251809, lng:          -71.005409, next: 'Quincy Adams'},
'Quincy Adams'  : { lat:   42.233391, lng:          -71.007153, next: 'Braintree'},
'Ashmont'       : { lat:   42.284652, lng:  -71.06448899999999, next: 'Shawmut'},
'Wollaston'     : { lat:  42.2665139, lng:         -71.0203369, next: 'Quincy Center'},
'Fields Corner': { lat:   42.300093, lng:          -71.061667, next: 'Savin Hill'},
'Central Square': { lat:   42.365486, lng:          -71.103802, next: 'Kendall/MIT'},
'Braintree'     : { lat:  42.2078543, lng:         -71.0011385, next: 'Ashmont'}
};

/* Client function, initializes map, draws markers/red line */
function init() {
        //Defines variable map as a new entity inside the div ID'd "map canvas"
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        var markers = place_markers(map);
        draw_red_line(map);


        var user = mark_user(map); //WK4 homework, MBTA2
        for (i in markers) {
                var infoWindow = new google.maps.InfoWindow();
                bindInfoWindow(markers[i], map, infoWindow);
        }

}


/* Iterates through stops and places custom icon'ed markers */
function place_markers(map) {
        var markers = [];
        // Defines a closed downward arrow as our marker icon
        var icon = {path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        strokeColor: 'red'};

        //Iterates through stops, draws marker at lng/lat on the map
        for (var stop in stations) {
                if (stations.hasOwnProperty(stop)) {
                        var lat = stations[stop].lat;
                        var lng = stations[stop].lng;
                        var pos = new google.maps.LatLng(lat, lng);
                        marker = new google.maps.Marker({
                                        icon: icon,
					position: pos,
					title: stop
				});
			marker.setMap(map);
                        markers.push(marker);
                }
        }
        return markers;
}


/*
*  Iterates through 'linked list' table structure and draws a line between
*  each stop on the red line. The linked list is shaped like a lasso; function
*  draws down/around, omitting Ashmont-Braintree and stops drawing @ Savin Hill.
*/
function draw_red_line(map) {
        var finished = false;
        var curr = 'Alewife';

        while (!finished) {
                var stop = stations[curr];

                /* Array with coordinates for path b/w two stops */
                var pathCoords = [];
                pathCoords.push({lat: stop.lat, lng: stop.lng})
                pathCoords.push({lat: stations[stop.next].lat,
                           lng: stations[stop.next].lng});

                if (stop.next != 'Ashmont') //Gap b/w Braintree and Ashmont
                        create_line(pathCoords, '#FF0000', map);

                if (curr == 'Savin Hill') finished = true;
                curr = stop.next;
        }
}

// Takes values for a line, creates line object and draws line on map
function create_line(pathCoords, color, map) {
        var line = new google.maps.Polyline({
            path: pathCoords,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
        line.setMap(map);
}

/* Utilizes in browser location services to find and mark the user on the
 map. It then creates an infobox which contains the users closest red line
 station. Returns the user's position */
function mark_user(map) {
        if (navigator.geolocation) { // error checking
                navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {lat: position.coords.latitude,
                                   lng: position.coords.longitude};
                        var marker = new google.maps.Marker({position: pos});
			marker.setMap(map);
                        //!!! removed closest_station...
                        //creates info box/draws line to user's closest station
                        create_infobox(marker, pos, map);
                        return pos;
                });
        } else {
                console.log("Your browser does not support this feature.");
        }
}


/*
 * Iterates through all red line stops and uses the haversine formula to find
 * the closest one to the user. Adds an infobox containing/line to it.
 */
function create_infobox(marker, user, map) {
        var closest_station = "";
        var distance = 0;

        //Iteratively checks all stations to find closest to user
        for (stop in stations) {
                st_pos = {lat: stations[stop].lat, lng: stations[stop].lng};
                var d = haversine(user, st_pos);
                if (d < distance || distance == 0) {
                        distance = d;
                        closest_station = stop;
                }
        }

        // Creates info window which, upon click, displays closest station/distance
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
                var info = "The closest station is " + closest_station + " located "
                                         + distance.toFixed(2) + " miles away";
        	infowindow.setContent(info);
        	infowindow.open(map, marker);
        });

        //Defines the endpoints and draws a path from user to closest station
        var pathCoords = [];
        pathCoords.push({lat: user.lat, lng: user.lng})
        pathCoords.push({lat: stations[closest_station].lat,
                         lng: stations[closest_station].lng});
        create_line(pathCoords, '#0000FF', map);
}

// Hacky work around to bind InfoWindow to station marker..
//"this" fix didn't work :(
function bindInfoWindow(marker, map, infowindow) {
        marker.addListener('click', function() {
                station_info(map, marker);
        });
}

/*
 * Creates an API request; upon response, calls "callme" which parses response
 * and creates an infobox displaying all trains coming to that station.
 */
function station_info(map, marker) {
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost:5000/redline.json", true); //!!! CHANGE BACK
        request.onreadystatechange = callme;
        request.send(null);


        function callme() {
                if (request.readyState == 4 && request.status == 200) {
                        raw_data = request.responseText;
                        theScheduleData = JSON.parse(raw_data);

                        var allTrains = theScheduleData.TripList.Trips;
                        var toStop = [];
                        var stop = marker.title;

                        /*Iterates through all running trains and finds trains
                        moving towards the stop in question. Stores in toStop*/
                        for (train in allTrains) {
                                sched = allTrains[train].Predictions;
                                for (trip in sched) {
                                        if (sched[trip].Stop == stop)
                                                toStop.push({dest: allTrains[train].Destination,
                                                             time: sched[trip].Seconds});
                                }
                        }
                        //Creates and opens infoWindow containing approaching trains
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(generate_table(toStop));
                        infoWindow.open(map, marker);
                } else if (request.status != 200) { //Upon error response
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent('API error');
                        infoWindow.open(map, marker);
                }
        };

        analytics_data(marker); //sends stop info to server
}

/*
 * Generates a table in HTML containing all trains approaching a given red line
 * stop and includes the prediction time. Returns the table HTML.
 */
function generate_table(trains) {
        var content = '<table border="1"><tbody><tr><td>Time to Arrival (sec)\
                        </td><td>Destination</td></tr>';
        for (j = 0; j < trains.length; j++) {
                tripData = '<tr><td>' + trains[j].time +'</td><td>'
                                + trains[j].dest+'</td></tr>';
                content += tripData;
        }
        content += '</tbody></table>';
        return content;
}

//Credit goes to talkol from Stack Overflow
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

/*
 * Function uses the haversine formula to return the distance between two
 * coordinates. Credit to StackOverflow.
 */
function haversine(pos1, pos2) {
        var lat1 = pos1.lat, lon1 = pos1.lng;
        var lat2 = pos2.lat, lon2 = pos2.lng;


        var R = 6371; // km
        //has a problem with the .toRad() method below.
        var x1 = lat2-lat1;
        var dLat = x1.toRad();
        var x2 = lon2-lon1;
        var dLon = x2.toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return (R * c)/1.609;
}

function analytics_data(marker) {
        var stop = {stop: marker.title};
        var data = JSON.stringify(stop);
        
        var req = new XMLHttpRequest();
        req.open("POST", 'http://localhost:5000/stop', true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = function () {
                console.log("server says", request.status);
        };
        req.send(data);
}
