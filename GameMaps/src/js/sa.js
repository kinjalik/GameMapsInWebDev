'use strict';

class Debug {
  constructor(isDebug, options) {
    this.isDebug = Boolean(isDebug);
    this.settings = options || {};
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
    if (obj.showCoordinates !== undefined) {
      this.settings.showCoordinates = Boolean(obj.showCoordinates) ;
      this.showCoordinates();
    }
    if (obj.logging !== undefined) { this.settings.logging = Boolean(obj.logging) }
  }

  showCoordinates() {
    let notifyPopup = L.popup()
    mymap.addEventListener('click', (e) => {
      if (this.settings.showCoordinates === true && this.status == true) {
        notifyPopup
        .setLatLng(e.latlng)
        .setContent(`
          <p>
            <b>Coordinates</b><br>
            <b>Lat:</b> ${SanAndreas.coordsTranslator('array', e.latlng)[0]}<br>
            <b>Lng:</b> ${SanAndreas.coordsTranslator('array', e.latlng)[1]}<br>
            <i>${SanAndreas.coordsTranslator('array', e.latlng).toString()}</i>
          </p>
          `)
        .openOn(mymap);
      }
    });
  }

  log(status, preMessage, messageBody) {
    if (this.status == false || this.settings.logging == false) return false;
    switch(status) {
      case 'error':
        console.error(preMessage, messageBody);
        break;
      case 'warn':
        console.warn(preMessage, messageBody);
        break;
      case 'info':
        console.info(preMessage, messageBody);
        break;
      case 'log':
        console.info(preMessage, messageBody);
        break;
    }
  }
}

let debug = new Debug(false);

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
      debug.log('log', 'Coords converter got:', 'Object');
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
      debug.log('log', 'Coords converter got:', 'Array');
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
      debug.log('error', 'Coordinates are not correct', '');
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

debug.options = {
  showCoordinates: false
}

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
      debug.log('info', 'GeoJSON:', test);
    });
  }
}

L.easyButton('<i class="fas fa-edit"></i>', function() {
  editMap();
}).addTo(mymap);

class Areas {
  constructor(jsonFile, isAddedToMap) {
    this.areasGeoJSON = this.getJson(jsonFile);
    debug.log('info', 'Areas GeoJSON:', this.areasGeoJSON);
    this.layer = this.drawLayer(this.areasGeoJSON, isAddedToMap)
    debug.log('info', 'Areas Layer:', this.layer);
  }

  getJson(address) {
    let xhr = new XMLHttpRequest(),
      places;
    xhr.open('GET', address, false);
    xhr.send();
    if (xhr.status != 200) {
      debug.log('error', 'Areas GeoJSON request failed.\n', `${xhr.status}: ${xhr.statusText}`);
    } else {
      return JSON.parse(xhr.responseText);
    }
  }

  drawLayer(GeoJSON, isAddedToMap) {
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
      }
    });
    if (isAddedToMap) layer.addTo(mymap);
    return layer;
  }

}

let areas = new Areas('json/SA_Police_Jursidictions.json');

class Places {
  constructor(jsonFile, isAddedToMap) {
    this.GeoJSON = this.getJson(jsonFile);
    debug.log('info', 'Places GeoJSON:', this.GeoJSON);
    this.layer = this.drawLayer(this.GeoJSON, isAddedToMap);
    debug.log('info', 'Places layer:', this.layer);
  }

  getJson(address) {
    let xhr = new XMLHttpRequest(),
      places;
    xhr.open('GET', address, false);
    xhr.send();
    if (xhr.status != 200) {
      debug.log('error', 'Areas GeoJSON request failed.\n', `${xhr.status}: ${xhr.statusText}`);
    } else {
      return JSON.parse(xhr.responseText);
    }
  }

  drawLayer(GeoJSON, isAddedToMap) {
    let layer = L.geoJSON(GeoJSON, {
      onEachFeature: (feature, layer) => {
        layer
          .bindPopup(`
            <b>${feature.properties.name}</b><br>
            <p>${feature.properties.description}</p>
          `)
          .setIcon(L.icon({
            iconUrl: `img/icons/${feature.properties.icon}.png`,
            iconSize: [16,16]
          }))
      }
    });
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
