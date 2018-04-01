var bundle_app =
(window["webpackJsonpbundle_name_"] = window["webpackJsonpbundle_name_"] || []).push([["app"],{

/***/ "./src/js/_Areas.js":
/*!**************************!*\
  !*** ./src/js/_Areas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetGeoJSON = __webpack_require__(/*! ./_GetGeoJSON.js */ "./src/js/_GetGeoJSON.js");

var Areas = function () {
  function Areas(map, jsonFile, isAddedToMap) {
    _classCallCheck(this, Areas);

    this.map = map;
    this.layer = new GetGeoJSON(this.map, 'json/SA_Police_Jursidictions.json', isAddedToMap, this.tooltipHandler, this.styleHandler);
  }

  _createClass(Areas, [{
    key: 'styleHandler',
    value: function styleHandler(color) {
      switch (color) {
        case 'blue':
          return { color: '#00a8ff' };
        case 'green':
          return { color: '#4cd137' };
        case 'red':
          return { color: '#e84118' };
      }
    }
  }, {
    key: 'tooltipHandler',
    value: function tooltipHandler(feature, layer) {
      layer.bindTooltip(feature.properties.name);
    }
  }]);

  return Areas;
}();

module.exports = Areas;

/***/ }),

/***/ "./src/js/_Debug.js":
/*!**************************!*\
  !*** ./src/js/_Debug.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = function () {
  function Debug(isDebug, options) {
    _classCallCheck(this, Debug);

    this.isDebug = Boolean(isDebug);
    this.settings = options || {};
  }

  _createClass(Debug, [{
    key: 'log',
    value: function log(status, preMessage, messageBody) {
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
  }, {
    key: 'status',
    get: function get() {
      return this.isDebug;
    },
    set: function set(newVal) {
      this.isDebug = Boolean(newVal);
    }
  }, {
    key: 'options',
    get: function get() {
      return this.settings;
    },
    set: function set(obj) {
      if (obj.logging !== undefined) {
        this.settings.logging = Boolean(obj.logging);
      }
    }
  }]);

  return Debug;
}();

module.exports = Debug;

/***/ }),

/***/ "./src/js/_Draw.js":
/*!*************************!*\
  !*** ./src/js/_Draw.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Draw = function () {
  function Draw(map) {
    _classCallCheck(this, Draw);

    this.editPanelShown = false;
    this.control(map);
  }

  _createClass(Draw, [{
    key: 'editMap',
    value: function editMap(map) {
      var _this = this;

      if (!this.editPanelShown) {
        this.editPanelShown = true;
        this.drawnItems = new bundle_vendor.L.FeatureGroup();
        map.addLayer(this.drawnItems);

        map.addControl(new bundle_vendor.L.Control.Draw({
          draw: {
            polygon: {
              allowIntersection: false,
              showArea: true
            }
          }
        }));

        map.on(bundle_vendor.L.Draw.Event.CREATED, function (event) {
          var layer = event.layer.addTo(map);
          var geoJSON = layer.toGeoJSON();
          geoJSON.properties = _this.getProps('Нет описания');
          bundle_vendor.buffer(JSON.stringify(geoJSON));
          alert('Данные GeoJSON объекта скопированы');
        });
      }
    }
  }, {
    key: 'getProps',
    value: function getProps(noDescMsg) {
      var name = prompt('Введите название точки');
      var desc = prompt('Введите описание точки.\nЕсли нет описание/желания писать его - нажмите "отмена"');
      if (desc === null || desc === '' || desc === undefined || desc === false) {
        desc = noDescMsg;
      }
      return {
        name: name,
        description: desc
      };
    }
  }, {
    key: 'control',
    value: function control(map) {
      var _this2 = this;

      bundle_vendor.L.easyButton('<i class="fas fa-edit"></i>', function () {
        _this2.editMap(map);
      }).addTo(map);
    }
  }]);

  return Draw;
}();

module.exports = Draw;

/***/ }),

/***/ "./src/js/_GetGeoJSON.js":
/*!*******************************!*\
  !*** ./src/js/_GetGeoJSON.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetGeoJSON = function () {
  function GetGeoJSON(map, jsonFile, isAddedToMap, onEachFeatureHandler, styleHandler) {
    _classCallCheck(this, GetGeoJSON);

    var json = this.getJson(jsonFile);
    this.map = map;
    return this.drawLayer(json, isAddedToMap, onEachFeatureHandler, styleHandler);
  }

  _createClass(GetGeoJSON, [{
    key: 'getJson',
    value: function getJson(address) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', address, false);
      xhr.send();
      if (xhr.status !== 200) {
        debug.log('error', 'GeoJSON request failed.\n', xhr.status + ': ' + xhr.statusText);
      } else {
        return JSON.parse(xhr.responseText);
      }
    }
  }, {
    key: 'drawLayer',
    value: function drawLayer(GeoJSON, isAddedToMap, onEachFeatureHandler, styleHandler) {
      var layer = bundle_vendor.L.geoJSON(GeoJSON, {
        style: styleHandler !== undefined ? function (feature) {
          return styleHandler(feature.properties.color);
        } : {},
        onEachFeature: onEachFeatureHandler !== undefined ? function (feature, layer) {
          return onEachFeatureHandler(feature, layer);
        } : undefined
      });
      if (isAddedToMap) layer.addTo(this.map);
      return layer;
    }
  }]);

  return GetGeoJSON;
}();

module.exports = GetGeoJSON;

/***/ }),

/***/ "./src/js/_Places.js":
/*!***************************!*\
  !*** ./src/js/_Places.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetGeoJSON = __webpack_require__(/*! ./_GetGeoJSON.js */ "./src/js/_GetGeoJSON.js");

var Places = function () {
  function Places(map, jsonFile, isAddedToMap) {
    _classCallCheck(this, Places);

    this.map = map;
    this.layer = new GetGeoJSON(this.map, 'json/SA_Places.json', isAddedToMap, this.popupHandler);
  }

  _createClass(Places, [{
    key: 'popupHandler',
    value: function popupHandler(feature, layer) {
      layer.bindPopup(feature.properties.name);
      layer.bindPopup('\n        <b>' + feature.properties.name + '</b><br>\n        <p>' + feature.properties.description + '</p>\n      ').setIcon(bundle_vendor.L.icon({
        iconUrl: 'img/icons/' + feature.properties.icon + '.png',
        iconSize: [16, 16]
      }));
    }
  }]);

  return Places;
}();

module.exports = Places;

/***/ }),

/***/ "./src/js/_SanAndreasMapPreset.js":
/*!****************************************!*\
  !*** ./src/js/_SanAndreasMapPreset.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  coordsTranslator: function coordsTranslator(outputData, data) {
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

/***/ "./src/js/sa.js":
/*!**********************!*\
  !*** ./src/js/sa.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Debug = __webpack_require__(/*! ./_Debug.js */ "./src/js/_Debug.js");
var Places = __webpack_require__(/*! ./_Places.js */ "./src/js/_Places.js");
var Draw = __webpack_require__(/*! ./_Draw.js */ "./src/js/_Draw.js");
var Areas = __webpack_require__(/*! ./_Areas.js */ "./src/js/_Areas.js");

var SanAndreas = __webpack_require__(/*! ./_SanAndreasMapPreset.js */ "./src/js/_SanAndreasMapPreset.js");

var mymap = bundle_vendor.L.map('mapid', {
  crs: SanAndreas.crs,
  maxBounds: [[3500, 3500], [-3500, -3500]],
  layers: [SanAndreas.maps.SASat]
});
mymap.setView([0, 0], 2);

var debug = new Debug(true, {
  showCoordinates: true,
  logging: false
});

var draw = new Draw(mymap);

var areas = new Areas(mymap, 'json/SA_Police_Jursidictions.json', true);

var places = new Places(mymap, 'json/SA_Places.json', true);

var layers = {
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad
};

var overlays = {
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer
};

bundle_vendor.L.control.layers(layers, overlays, {
  collapsed: false
}).addTo(mymap);

var app = {
  SanAndreas: SanAndreas,
  mymap: mymap,
  debug: debug,
  draw: draw,
  areas: areas,
  places: places,
  layers: layers,
  overlays: overlays
};

module.exports = app;

/***/ }),

/***/ "./src/scss/sa.scss":
/*!**************************!*\
  !*** ./src/scss/sa.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/js/sa.js ./src/scss/sa.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/sa.js */"./src/js/sa.js");
module.exports = __webpack_require__(/*! ./src/scss/sa.scss */"./src/scss/sa.scss");


/***/ })

},[[0,"tools"]]]);
//# sourceMappingURL=app.js.map