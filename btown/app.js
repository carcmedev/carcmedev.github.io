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
      url: "bus100.json",
      dataType: "json",
      mimeType: "application/json",
      success: function(data) {
        processData(data);
      }
    });
  });


  // add a layer group, yet empty
  var markersLayer = new L.LayerGroup();
  map.addLayer(markersLayer);

  // add the search bar to the map
  var controlSearch = new L.Control.Search({
    position: 'topleft', // where do you want the search bar?
    layer: markersLayer, // name of the layer
    initial: false,
    zoom: 11, // set zoom to found location when searched
    marker: false,
    textPlaceholder: 'Search...' // placeholder while nothing is searched
  });

  map.addControl(controlSearch); // add it to the map

  // add var "code"
  var code = '1ciPq3VfxUv3ucttkMPzNXNR1NLKA1JrOq1tGiLg2CsI'

  // loop through spreadsheet with Tabletop
  Tabletop.init({
    key: code,
    callback: function(sheet, tabletop) {

      for (var i in sheet) {
        var data = sheet[i];

        var icon = L.icon({
          iconUrl: data.icon,
          iconSize: [52, 60], // size of the icon
          iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -60]
        });
        if (data.iconori === "left") {
          icon = L.icon({
            iconUrl: data.icon,
            iconSize: [60, 52],
            iconAnchor: [60, 26],
            popupAnchor: [-35, -26]
          });
        };
        if (data.iconori === "right") {
          icon = L.icon({
            iconUrl: data.icon,
            iconSize: [60, 52],
            iconAnchor: [0, 26],
            popupAnchor: [35, -26]
          })
        };

        // delete or exclude the marker adding part
        // L.marker([data.longitude, data.latitude], {icon: icon})
        //  .addTo(map)
        //  .bindPopup("<strong style="color: #84b819;">" + data.newsroom + "</strong>" + data.company + " | " + data.city + "Head: " + data.head).openPopup();

      }
    },
    simpleSheet: true
  })









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
}
