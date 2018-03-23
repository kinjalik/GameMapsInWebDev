let SanAndreas = {
  maps: {
    SASat: L.tileLayer('maps/SASat/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Satellite Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true
    }),
    SARoad: L.tileLayer('maps/SARoad/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Atlus Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true
    })
  },
  crs: L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.04266666666, 127.99999998, 0.04266666666, 127.99999998),
  }),
}

let mymap = L.map('mapid', {
  crs: SanAndreas.crs,
  maxBounds: [
    [3500, 3500],
    [-3500, -3500]
  ],
  layers: [SanAndreas.maps.SASat]
});
mymap.setView([0, 0], 2);

let layers = {
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad
}

L.control.layers(layers).addTo(mymap);

let notifyPopup = L.popup()
mymap.on('click', function(e) {
  notifyPopup
    .setLatLng(e.latlng)
    .setContent('<p>Coordinates<br />Lat Lng: ' + e.latlng.toString() + '</p>')
    .openOn(mymap);
})

let editPanelShown = false;

function editMap() {
  if (!editPanelShown) {
    editPanelShown = true;
    var drawnItems = new L.FeatureGroup();
    mymap.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });

    mymap.addControl(new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: {
          allowIntersection: false
        }
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true
        }
      }
    }));

    mymap.on(L.Draw.Event.CREATED, function(event) {
      var layer = event.layer;

      layer.addTo(mymap);

      let test = JSON.stringify(layer.toGeoJSON());
      console.log(test);
    });
  }
}

L.easyButton('<i class="fas fa-edit"></i>', function() {
  editMap();
}).addTo(mymap);

class Places {
  constructor(placesFile) {
    this.placesList = this.getPlaces(placesFile);
    this.markers = [];
    this.makeMarkers();
  }

  getPlaces(address) {
    let xhr = new XMLHttpRequest(),
      places;
    xhr.open('GET', address, false);
    xhr.send();
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      return JSON.parse(xhr.responseText);
    }
  }

  makeMarkers() {
    for (let place of this.placesList) {
      this.markers.push(L.marker([place.lat, place.lng]).addTo(mymap).bindPopup(place.name));
    }
  }

  removeMarkers() {
    for (var i = this.markers.length - 1; i >= 0; i--) {
      this.markers[i].remove();
      this.markers.pop(i);
    }
  }

  rerenderMarkers() {
    this.removeMarkers();
    this.makeMarkers();
  }
}

let places = new Places('json/sanAndreas.json');
