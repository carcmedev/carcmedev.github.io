function initiMap() {

	var map = L.map('map');
	map.setView([52.516260, 13.377425], 12);

	var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; OpenStreetMap contributors'
	});

	// add a minimal zoom to prevent users from zooming out too far
	map._layersMinZoom = 5;

	var sidebar = L.control.sidebar('sidebar').addTo(map);

	map.addControl(new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat', 'lon'],
		markerLocation: true,
		// marker: L.marcircleMarker([0, 0], {
		// 			radius: 30
		// 		}),
		zoom: 16,
		autoCollapse: true,
		autoType: false,
		minLength: 3
	}));

	// addGoogleSearch(map);
	addPoiLayers(map, osm);
}

function addPoiLayers(map, osm) {

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
				var color = e.tags.collection_times ? 'green' : 'blue';
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
						fillColor: '#a3f',
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
				var color = e.tags.collection_times ? 'green' : 'green';
				var circle = L.circle(pos, 50, {
						color: color,
						fillColor: '#3fa',
						fillOpacity: 0.5
					})
					.bindPopup(popup);
				this.instance.addLayer(circle);
			}
		},
	});


	var baseMaps = {
		"Mapnik": osm,
	};

	var overlayMaps = {
		"Bars": bars,
		"Pubs": pubs,
		"Restaurants": restaurant
	};

	// use this to turn it on by default
//	map.addLayer(bars);
	osm.addTo(map);

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
