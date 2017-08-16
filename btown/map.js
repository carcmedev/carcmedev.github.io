function initiMap() {

	var map = L.map('map');
	map.setView([52.516260, 13.377425], 12);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; OpenStreetMap contributors'
	}).addTo(map);

	// add a minimal zoom to prevent users from zooming out too far
	map._layersMinZoom = 5;

	var sidebar = L.control.sidebar('sidebar').addTo(map);

	map.addControl(new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat', 'lon'],
		marker: L.circleMarker([0, 0], {
			radius: 30
		}),
		autoCollapse: true,
		autoType: false,
		minLength: 3
	}));

}
