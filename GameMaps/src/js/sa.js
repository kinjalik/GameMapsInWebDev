
class Debug {
  constructor(isDebug, options) { 
    this.isDebug = Boolean(isDebug);
    this.settings = options || {};
    if (this.settings.showCoordinates === true) {
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
      this.settings.showCoordinates = Boolean(obj.showCoordinates);
      this.showCoordinates();
    }
    if (obj.logging !== undefined) { this.settings.logging = Boolean(obj.logging); }
  }

  showCoordinates() {
    const notifyPopup = L.popup();
    mymap.addEventListener('click', (e) => {
      if (this.settings.showCoordinates === true && this.status === true) {
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
    if (this.status === false || this.settings.logging === false) return false;
    switch (status) {
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
      default:
        console.log(preMessage, messageBody);
    }
  }
}

let SanAndreas = {
  maps: {
    SASat: L.tileLayer('maps/SASat/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Satellite Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true,
    }),
    SARoad: L.tileLayer('maps/SARoad/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Atlus Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true,
    }),
  },
  crs: L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.04266666666, 127.99999998, -0.04266666666, 127.99999998),
  }),
  coordsTranslator: (outputData, data) => {
    if (data instanceof Object && !(data instanceof Array)) {
      debug.log('log', 'Coords converter got:', 'Object');
      return [data.lng.toFixed(4), data.lat.toFixed(4)];
    } else if (data instanceof Array) {
      debug.log('log', 'Coords converter got:', 'Array');
      return [data[1].toFixed(4), data[0].toFixed(4)];
    } else {
      debug.log('error', 'Coordinates are not correct', '');
    }
  },
};

let mymap = L.map('mapid', {
  crs: SanAndreas.crs,
  maxBounds: [
    [3500, 3500],
    [-3500, -3500],
  ],
  layers: [SanAndreas.maps.SASat],
});
mymap.setView([0, 0], 2);


let debug = new Debug(true, {
  showCoordinates: true,
  logging: false,
});

class Draw {
  constructor(map) {
    this.editPanelShown = false;
    this.control(map);
  }

  editMap(map) {
    if (!this.editPanelShown) {
      this.editPanelShown = true;
      this.drawnItems = new L.FeatureGroup();
      map.addLayer(this.drawnItems);

      map.addControl(new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
          },
        },
      }));

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer.addTo(map);
        const geoJSON = layer.toGeoJSON();
        geoJSON.properties = this.getProps('Нет описания');
        copy(JSON.stringify(geoJSON));
        alert('Данные GeoJSON объекта скопированы');
      });
    }
  }

  getProps(noDescMsg) {
    let name = prompt('Введите название точки');
    let desc = prompt('Введите описание точки.\nЕсли нет описание/желания писать его - нажмите "отмена"');
    if (desc === null || desc === '' || desc === undefined || desc === false) {
      desc = noDescMsg;
    }
    return {
      name: name,
      description: desc
    }
  }

  control(map) {
    L.easyButton('<i class="fas fa-edit"></i>', () => {
      this.editMap(map);
    }).addTo(map);
  }

}

const draw = new Draw(mymap);

class Areas {
  constructor(jsonFile, isAddedToMap) {
    this.layer = new GetGeoJSON('json/SA_Police_Jursidictions.json', isAddedToMap, this.tooltipHandler, this.styleHandler);
    debug.log('info', 'Areas GeoJSON:', this.layer);
  }

  styleHandler(color) {
    switch (color) {
      case 'blue':
        return { color: '#00a8ff' };
      case 'green':
        return { color: '#4cd137' };
      case 'red':
        return { color: '#e84118' };
    }
  }

  tooltipHandler(feature, layer) {
    layer.bindTooltip(feature.properties.name);
  }
}
class Places {
  constructor(jsonFile, isAddedToMap) {
    this.layer = new GetGeoJSON('json/SA_Places.json', isAddedToMap, this.popupHandler);
    debug.log('info', 'Areas GeoJSON:', this.layer);
  }

  popupHandler(feature, layer) {
    layer.bindPopup(feature.properties.name);
    layer
      .bindPopup(`
        <b>${feature.properties.name}</b><br>
        <p>${feature.properties.description}</p>
      `)
      .setIcon(L.icon({
        iconUrl: `img/icons/${feature.properties.icon}.png`,
        iconSize: [16, 16],
      }));
  }
}

class GetGeoJSON {
  constructor(jsonFile, isAddedToMap, onEachFeatureHandler, styleHandler) {
    const json = this.getJson(jsonFile);
    return this.drawLayer(json, isAddedToMap, onEachFeatureHandler, styleHandler);
  }

  getJson(address) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', address, false);
    xhr.send();
    if (xhr.status !== 200) {
      debug.log('error', 'GeoJSON request failed.\n', `${xhr.status}: ${xhr.statusText}`);
    } else {
      return JSON.parse(xhr.responseText);
    }
  }

  drawLayer(GeoJSON, isAddedToMap, onEachFeatureHandler, styleHandler) {
    const layer = L.geoJSON(GeoJSON, {
      style: styleHandler !== undefined ? (feature) => styleHandler(feature.properties.color) : {},
      onEachFeature: onEachFeatureHandler !== undefined ? (feature, layer) => onEachFeatureHandler(feature, layer) : undefined
    });
    if (isAddedToMap) layer.addTo(mymap);
    return layer;
  }
}

const areas = new Areas('json/SA_Police_Jursidictions.json', true);

const places = new Places('json/SA_Places.json', true);

const layers = {
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad,
};

const overlays = {
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer,
};

L.control.layers(layers, overlays, {
  collapsed: false,
}).addTo(mymap);

