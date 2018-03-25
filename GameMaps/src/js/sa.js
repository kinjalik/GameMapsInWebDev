'use strict';

class Debug {
  constructor(isDebug, options) {
    this.isDebug = Boolean(isDebug);
    this.settings = options;
    if (this.settings.showCoordinates == true) {
      this.showCoordinates();
    }
  }

  get status() {
    return this.isDebug;
  }

  set status(newVal) {
    this.isDebug = Boolean(newVal);
  }

  get options() {
    return this.settings;
  }

  set options(obj) {
    if (obj.showCoordinates !== undefined) { this.settings.showCoordinates = Boolean(obj.showCoordinates) }
  }

  showCoordinates() {
    let notifyPopup = L.popup()
    mymap.addEventListener('click', (e) => {
      if (this.settings.showCoordinates === true && this.status == true) {
        notifyPopup
        .setLatLng(e.latlng)
        .setContent('<p>Coordinates<br />Lat Lng: ' + SanAndreas.coordsTranslator('array', e.latlng).toString() + '</p>')
        .openOn(mymap);
      }
    });
  }
}

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
    transformation: new L.Transformation(0.04266666666, 127.99999998, -0.04266666666, 127.99999998),
  }),
  coordsTranslator: (outputData, data) => {
    if (data instanceof Object && !(data instanceof Array)) {
      console.log('Got Object');
      switch (outputData) {
        case 'object':
          return {
            lat: data.lng.toFixed(4),
            lng: data.lat.toFixed(4)
          }
        case 'array':
          return [data.lng.toFixed(4), data.lat.toFixed(4)];
      }
    } else if (data instanceof Array) {
      console.log('Got Array');
      switch (outputData) {
        case 'object':
          return {
            lat: data[1].toFixed(4),
            lng: data[0].toFixed(4)
          }
        case 'array':
          return [data[1].toFixed(4), data[0].toFixed(4)];
      }
    } else {
      console.error('Wrong coordinates');
    }
  },
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

class Areas {
  constructor(jsonFile, isAddedToMap) {
    this.areasGeoJSON = this.getJson(jsonFile);
    console.log('GeoJSON:', this.areasGeoJSON);
    this.layer = this.drawLayer(this.areasGeoJSON, isAddedToMap)
    console.log('Layer:', this.layer);
  }

  getJson(address) {
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

  drawLayer(GeoJSON, isAddedToMap) {
    let toolTipText;
    let layer = L.geoJSON(GeoJSON, {
      style: (feature) => {
        switch (feature.properties.color) {
          case "blue":
            return { color: "#00a8ff" };
          case "green":
            return { color: "#4cd137" };
          case "red":
            return { color: "#e84118" };
        }
      },
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
        console.log(layer);
      }
    });
    if (isAddedToMap) layer.addTo(mymap);
    console.log(toolTipText);
    return layer;
  }

}

let areas = new Areas('json/SA_Police_Jursidictions.json');

class Places {
  constructor(jsonFile, isAddedToMap) {
    this.GeoJSON = this.getJson(jsonFile);
    console.log('GeoJSON:', this.GeoJSON);
    this.layer = this.drawLayer(this.GeoJSON, isAddedToMap);
    console.log('Layer:', this.layer);
  }

  getJson(address) {
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

  drawLayer(GeoJSON, isAddedToMap) {
    let layer = L.geoJSON(GeoJSON);
    if (isAddedToMap) layer.addTo(mymap);
    return layer;
  }

}

let places = new Places('json/SA_places.json', true);

let overlays = {
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer
}

L.control.layers(layers, overlays, {
  collapsed: false
}).addTo(mymap);
