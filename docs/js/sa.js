var bundle_sa =
(window["webpackJsonpbundle_name_"] = window["webpackJsonpbundle_name_"] || []).push([[3],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

class GetGeoJSON {
  constructor(map, jsonFile, isAddedToMap, onEachFeatureHandler, styleHandler) {
    const json = this.getJson(jsonFile);
    this.map = map;
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
    const layer = bundle_vendor.L.geoJSON(GeoJSON, {
      style: styleHandler !== undefined ? feature => styleHandler(feature.properties.color) : {},
      onEachFeature: onEachFeatureHandler !== undefined ? (feature, layer) => onEachFeatureHandler(feature, layer) : undefined
    });
    if (isAddedToMap) layer.addTo(this.map);
    return layer;
  }
}

module.exports = GetGeoJSON;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {
  maps: {
    SASat: bundle_vendor.L.tileLayer('maps/SASat/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Satellite Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true
    }),
    SARoad: bundle_vendor.L.tileLayer('maps/SARoad/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Atlus Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true
    })
  },
  crs: bundle_vendor.L.extend({}, bundle_vendor.L.CRS.Simple, {
    transformation: new bundle_vendor.L.Transformation(0.04266666666, 127.99999998, -0.04266666666, 127.99999998)
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
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

let GetGeoJSON = __webpack_require__(1);

class Areas {
  constructor(map, jsonFile, isAddedToMap) {
    this.map = map;
    this.layer = new GetGeoJSON(this.map, 'json/SA_Police_Jursidictions.json', isAddedToMap, this.tooltipHandler, this.styleHandler);
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

module.exports = Areas;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

let GetGeoJSON = __webpack_require__(1);

class Places {
  constructor(map, jsonFile, isAddedToMap) {
    this.map = map;
    this.layer = new GetGeoJSON(this.map, 'json/SA_Places.json', isAddedToMap, this.popupHandler);
    console.log(this.layer);
  }

  popupHandler(feature, layer) {
    layer.bindPopup(feature.properties.name);
    layer.bindPopup(`
        <b>${feature.properties.name}</b><br>
        <p>${feature.properties.description}</p>
      `).setIcon(bundle_vendor.L.icon({
      iconUrl: `img/icons/${feature.properties.icon}.png`,
      iconSize: [16, 16]
    }));
  }
}

module.exports = Places;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

class Debug {
  constructor(isDebug, options) {
    this.isDebug = Boolean(isDebug);
    this.settings = options || {};
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
    if (obj.logging !== undefined) {
      this.settings.logging = Boolean(obj.logging);
    }
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

module.exports = Debug;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* global bundle_style, bundle_vendor */

const Debug = __webpack_require__(17);
const Places = __webpack_require__(16);
const Draw = __webpack_require__(0);
const Areas = __webpack_require__(15);

const SanAndreas = __webpack_require__(14);

const mymap = bundle_vendor.L.map('mapid', {
  crs: SanAndreas.crs,
  maxBounds: [[3500, 3500], [-3500, -3500]],
  layers: [SanAndreas.maps.SASat]
});
mymap.setView([0, 0], 2);

const debug = new Debug(true, {
  showCoordinates: true,
  logging: false
});

const draw = new Draw(mymap);

const areas = new Areas(mymap, 'json/SA_Police_Jursidictions.json', true);

const places = new Places(mymap, 'json/SA_Places.json', true);

const layers = {
  // Leaflet need's quotes
  /* eslint-disable */
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad
  /* eslint-enable */
};

const overlays = {
  /* eslint-disable */
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer
  /* eslint-enable */
};

bundle_vendor.L.control.layers(layers, overlays).addTo(mymap);

const app = {
  SanAndreas,
  mymap,
  debug,
  draw,
  areas,
  places,
  layers,
  overlays
};

module.exports = app;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
module.exports = __webpack_require__(13);


/***/ })
],[[19,0]]]);