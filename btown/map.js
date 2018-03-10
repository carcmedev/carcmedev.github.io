var nikolaiviertelData = [{
	"stopName": "1 A Little Introduction",
	"lat": 52.516685,
	"long": 13.408565
}, {
	"stopName": "2 The Eiergasse",
	"lat": 52.516757,
	"long": 13.408391
}, {
	"stopName": "3 Molkenmarkt",
	"lat": 52.5165,
	"long": 13.409316
}, {
	"stopName": "4 Zum Nußbaum",
	"lat": 52.517172,
	"long": 13.407068
}, {
	"stopName": "5 Nikolai Church",
	"lat": 52.51692,
	"long": 13.407503
}, {
	"stopName": "6 The Gerichtslaube",
"lat": 52.5171,
	"long": 13.406122
}, {
	"stopName": "7 Berlin City Castle",
	"lat": 52.517408,
	"long": 13.402016
}, {
	"stopName": "8 The Neuer Marstall ",
	"lat": 52.516276,
	"long": 13.404507
}, {
	"stopName": "9 Saint George",
	"lat": 52.516299,
	"long": 13.405601
}, {
	"stopName": "10 The Ephraim-Palais",
	"lat": 52.515897,
	"long": 13.407184
}, {
	"stopName": "11 Restaurant „Zur Rippe“",
	"lat": 52.5163,
	"long": 13.407849
}, {
	"stopName": "12 Knoblauch House“",
	"lat": 52.516473,
	"long": 13.406985
}, {
	"stopName": "13 Parish Church",
	"lat": 52.51709,
	"long": 13.412862
}, {
	"stopName": "14 Restaurant „Zur letzten Instanz“",
	"lat": 52.51735,
	"long": 13.41375
}, {
	"stopName": "15 Franciscan Abbey Church",
	"lat": 52.51837,
	"long": 13.412361
}]



var bus100Data = [{
	"stopName": "1 Zoologischer Garten",
	"lat": 52.507294,
	"long": 13.332367
}, {
	"stopName": "2 Breitscheidplatz",
	"lat": 52.505016,
	"long": 13.335304
}, {
	"stopName": "3 Kaiser Wilhelm Memory Church",
	"lat": 52.504803,
	"long": 13.335042
}, {
	"stopName": "4 Bayreuther Straße / Schillstraße",
	"lat": 52.503885,
	"long": 13.345934
}, {
	"stopName": "5 Lützowplatz",
	"lat": 52.504568,
	"long": 13.352447
}, {
	"stopName": "6 Nordische Botschaften",
	"lat": 52.508563,
	"long": 13.350368
}, {
	"stopName": "7 Victory Column / Siegessaule",
	"lat": 52.51454,
	"long": 13.35011
}, {
	"stopName": "8 Schloss Bellevue",
	"lat": 52.51757,
	"long": 13.35279
}, {
	"stopName": "9 Haus der Kulturen der Welt",
	"lat": 52.5189,
	"long": 13.36491
}, {
	"stopName": "10 Platz der Republik",
	"lat": 52.51861,
	"long": 13.37265
}, {
	"stopName": "11 Reichstag",
	"lat": 52.51862,
	"long": 13.37618
}, {
	"stopName": "12 Brandenburg Tor",
	"lat": 52.516418,
	"long": 13.377693
}, {
	"stopName": "13 Unter den Linden",
	"lat": 52.516998,
	"long": 13.389548
}, {
	"stopName": "14 Berlin State Opera",
	"lat": 52.517089,
	"long": 13.394655
}, {
	"stopName": "15 Lustgarten",
	"lat": 52.518859,
	"long": 13.399224
}, {
	"stopName": "16 Marienkirche",
	"lat": 52.520761,
	"long": 13.40709
}, {
	"stopName": "17 Alexanderplatz",
	"lat": 52.522062,
	"long": 13.413268
}, {
	"stopName": "18 Fernsehturm",
	"lat": 52.520815,
	"long": 13.409398
}]


var meseumInsellData = [{
	"stopName": "1 A little Introduction",
	"lat": 52.518163,
	"long": 13.400196
}, {
	"stopName": "2 Lustgarden",
	"lat": 52.518163,
	"long": 13.400196
}, {
	"stopName": "3 Berlin Dom",
	"lat": 52.519051,
	"long": 13.401083
}, {
	"stopName": "4 Altes Museum",
	"lat": 52.519462,
	"long": 13.398748
}, {
	"stopName": "5 The Sculpture Garden of the Colonnades Yard",
	"lat": 52.520267,
	"long": 13.399067
}, {
	"stopName": "6 Neues Museum",
	"lat": 52.520125,
	"long": 13.397657
}, {
	"stopName": "7 Alte Nationalgallerie",
	"lat": 52.520807,
	"long": 13.398354
}, {
	"stopName": "8 Pergamonmuseum",
	"lat": 52.521172,
	"long": 13.396907
}, {
	"stopName": "9 Bode Museum",
	"lat": 52.521884,
	"long": 13.394246
}]



var map;
var markers = new Array();

// Append list items
function addToList(name) {

	var list = document.getElementById("list");
    var li = document.createElement("li");
	li.setAttribute("class", "padded");
    li.appendChild(document.createTextNode(name));
	li.addEventListener('click', panToMarker.bind(null, name));
    list.appendChild(li);
}


// Click handler for handling
function panToMarker(data) {
	for (var i = 0, len = markers.length; i < len; i++) {
		if (markers[i].title == data) {
			map.setView(markers[i].getLatLng(), 17);
			markers[i].openPopup();
		}
	}
}


function showNikolaiviertelLayer() {

	markersDel();
	nikolaiviertelData.forEach(function(point) {
		addMarker(point);
		addToList(point.stopName);

	});
	group = new L.featureGroup(markers);
	 map.fitBounds(group.getBounds().pad(0.5));
 }

function showMuseumInselLayer() {
	markersDel();
	meseumInsellData.forEach(function(point) {
		addMarker(point);
		addToList(point.stopName);
	});
	group = new L.featureGroup(markers);
	 map.fitBounds(group.getBounds().pad(0.5));
}


function showBus100Layer() {
	markersDel();
	bus100Data.forEach(function(point) {
		addMarker(point);
		addToList(point.stopName);
	});
	group = new L.featureGroup(markers);
	 map.fitBounds(group.getBounds().pad(0.5));
}

function addMarker(point) {
	var lat = point.lat;
	var lon = point.long;

	marker = new L.Marker([lat,lon])
	marker.title = point.stopName;

	map.addLayer(marker);
	marker.bindPopup(point.stopName);

	markers.push(marker);
}


function markersDel() {
	for(i=0;i<markers.length;i++) {
		map.removeLayer(markers[i]);
	}
	markers = new Array();
	var list = document.getElementById("list");
	list.innerHTML = '';
}


function initiMap() {

	map = L.map('map');
	map.setView([52.516260, 13.377425], 12);
	map.zoomAnimation = true;
	map.markerZoomAnimation = true;

	// var osm = L.tileLayer('http://{s}.tile.tiles.mapbox.com/v3/gvenech.m13knc8e/{z}/{x}/{y}.png', {
	// 	maxZoom: 18,
	//  	attribution: 'Map data &copy; OpenStreetMap contributors'
	//  });
	var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; OpenStreetMap contributors'
	});

	// add a minimal zoom to prevent users from zooming out too far
	map._layersMinZoom = 5;

	var sidebar = L.control.sidebar('sidebar').addTo(map);


/* Put this back in when move from GitHub hosting  - Can still add the layers with the tours while on GitHub (todo)


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
*/
	osm.addTo(map);

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
