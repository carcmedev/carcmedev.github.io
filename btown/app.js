function myFunction() {

  var map = L.map('map');
  map.setView([52.516260, 13.377425], 6);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
  }).addTo(map);

  // add a minimal zoom to prevent users from zooming out too far
  map._layersMinZoom = 5;


  var marker = L.marker([52.516260, 13.377425]).addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();;


  L.circle([52.556260, 13.377425], 50, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map).bindPopup("I am a circle.");

  var sidebar = L.control.sidebar('sidebar').addTo(map);

  var popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("todo: Reverse Lookup" + e.latlng.toString())
      .openOn(map);
  }

   map.on('click', onMapClick);






  // load json-file
  $(document).ready(function() {
    $.ajax({
      type: "GET",
      url: "ddj.json",
      dataType: "json",
      mimeType: "application/json",
      success: function(data) {
        processData(data);
      }
    });
  });


  function processData(allText) {

    for (var i in allText) {
      data = allText[i];
      var customicon = L.icon({
        // the iconUrl is now the ith element in data.icon
        iconUrl: data.icon,
        iconSize: [52, 60], // size of the icon
        iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -60] // point of the icon where the popup window will open
      });

      // add the marker to the map
      L.marker([data.long, data.lat], {
          icon: customicon
        })
        .addTo(map).bindPopup("<strong style='color: #84b819'>" + data.newsroom + "</strong><br>" + data.company + " | " + data.city + "<br>Head: " + data.head)

      // close the loop, the function processData(allText) and myFunction()
    }
  }
}
