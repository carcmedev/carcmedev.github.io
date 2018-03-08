function myFunction() {

	// var map = L.map('map', {
	// 		zoom: 11,
	// 		center: L.latLng([52.516260, 13.377425]),
	//         maxBounds: L.latLngBounds([[52.674868, 13.719984],[52.402008, 13.071110]]).pad(0.5),
	// 		attributionControl: false
	// 	}),
	// 	osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


	var map = L.map('map');
	map.setView([52.516260, 13.377425], 6);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; OpenStreetMap contributors'
	}).addTo(map);

	// add a minimal zoom to prevent users from zooming out too far
	map._layersMinZoom = 5;

	// Creates a red marker with the coffee icon
	var redMarker = L.AwesomeMarkers.icon({
		icon: 'coffee',
		markerColor: 'red',
		spin: true

	});

	L.marker([52.511260, 13.337425], {
		icon: redMarker
	}).addTo(map);

	// var marker = L.marker([52.516260, 13.377425]).addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();


	// L.circle([52.556260, 13.377425], 50, {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5
	// }).addTo(map).bindPopup("I am a circle.");

	var sidebar = L.control.sidebar('sidebar').addTo(map);

	// var popup = L.popup();
	//
	// function onMapClick(e) {
	// 	popup
	// 		.setLatLng(e.latlng)
	// 		.setContent("todo: Reverse Lookup" + e.latlng.toString())
	// 		.openOn(map);
	// }
	//
	// map.on('click', onMapClick);

	// load json-file
	// $(document).ready(function() {
	//   $.ajax({
	//     type: "GET",
	//     url: "ddj.json",
	//     dataType: "json",
	//     mimeType: "application/json",
	//     success: function(data) {
	//       processData(data);
	//     }
	//   });
	// });
	//
	// function processData(allText) {
	//
	//   for (var i in allText) {
	//     data = allText[i];
	//     var customicon = L.icon({
	//       // the iconUrl is now the ith element in data.icon
	//       iconUrl: data.icon,
	//       iconSize: [52, 60], // size of the icon
	//       iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
	//       popupAnchor: [0, -60] // point of the icon where the popup window will open
	//     });
	//
	//     // add the marker to the map
	//     L.marker([data.long, data.lat], {
	//         icon: customicon
	//       })
	//       .addTo(map).bindPopup("<strong style='color: #84b819'>" + data.newsroom + "</strong><br>" + data.company + " | " + data.city + "<br>Head: " + data.head)
	//
	//     // close the loop, the function processData(allText) and myFunction()
	//   }
	// }

	// // add a layer group, yet empty
	// var markersLayer = new L.LayerGroup();
	// map.addLayer(markersLayer);

	// add the search bar to the map
	// map.addControl(new L.Control.Search({
	// 	url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
	// 	jsonpParam: 'json_callback',
	// 	propertyName: 'display_name',
	// 	propertyLoc: ['lat', 'lon'],
	// 	marker: L.marker([0, 0]),
	// 	// marker: L.circleMarker([0, 0], {
	// 	// 	radius: 30
	// 	// }),
	// 	autoCollapse: true,
	// 	autoType: false,
	// 	minLength: 3
	// })).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
	//
	// addGoogleSearch(map);

	addPoiLayers(map);
}

function addPoiLayers(map) {

	// query part for: “bar”
	var bars = new L.OverPassLayer({
		minzoom: 17,
		query: "node(BBOX)[amenity=bar];out;",
		callback: function(data) {
			for (i = 0; i < data.elements.length; i++) {
				e = data.elements[i];

				if (e.id in this.instance._ids) return;
				this.instance._ids[e.id] = true;
				var pos = new L.LatLng(e.lat, e.lon);
				var popup = this.instance._poiInfo(e.tags, e.id);
				var color = e.tags.collection_times ? 'green' : 'red';
				var circle = L.circle(pos, 50, {
						color: color,
						fillColor: '#fa3',
						fillOpacity: 0.5
					})
					.bindPopup(popup);
				this.instance.addLayer(circle);
			}
		},
	});

	// query part for: “pub”
	var pubs = new L.OverPassLayer({
		minzoom: 17,
		query: "node(BBOX)[amenity=pub];out;",
		callback: function(data) {
			for (i = 0; i < data.elements.length; i++) {
				e = data.elements[i];

				if (e.id in this.instance._ids) return;
				this.instance._ids[e.id] = true;
				var pos = new L.LatLng(e.lat, e.lon);
				var popup = this.instance._poiInfo(e.tags, e.id);
				var color = e.tags.collection_times ? 'green' : 'red';
				var circle = L.circle(pos, 50, {
						color: color,
						fillColor: '#fa3',
						fillOpacity: 0.5
					})
					.bindPopup(popup);
				this.instance.addLayer(circle);
			}
		},
	});


	// query part for: “restaurant”
	var restaurant = new L.OverPassLayer({
		minzoom: 17,
		query: "node(BBOX)[amenity=restaurant];out;",
		callback: function(data) {
			for (i = 0; i < data.elements.length; i++) {
				e = data.elements[i];

				if (e.id in this.instance._ids) return;
				this.instance._ids[e.id] = true;
				var pos = new L.LatLng(e.lat, e.lon);
				var popup = this.instance._poiInfo(e.tags, e.id);
				var color = e.tags.collection_times ? 'green' : 'red';
				var circle = L.circle(pos, 50, {
						color: color,
						fillColor: '#fa3',
						fillOpacity: 0.5
					})
					.bindPopup(popup);
				this.instance.addLayer(circle);
			}
		},
	});


	var baseMaps = {
		"Mapnic": osm,
	};

	var overlayMaps = {
		"Bars": bars,
		"Pubs": pubs,
		"Restaurants": restaurant
	};
	map.addLayer(bars);

	L.control.layers(baseMaps, overlayMaps).addTo(map);
}

function addGoogleSearch(map) {
	var geocoder = new google.maps.Geocoder();

	function googleGeocoding(text, callResponse) {
		geocoder.geocode({
			address: text
		}, callResponse);
	}

	function formatJSON(rawjson) {
		var json = {},
			key, loc, disp = [];

		for (var i in rawjson) {
			key = rawjson[i].formatted_address;

			loc = L.latLng(rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng());

			json[key] = loc; //key,value format
		}

		return json;
	}

	map.addControl(new L.Control.Search({
		sourceData: googleGeocoding,
		formatData: formatJSON,
		markerLocation: true,
		zoom: 16,
		autoType: false,
		autoCollapse: true,
		minLength: 3
	}));
}
