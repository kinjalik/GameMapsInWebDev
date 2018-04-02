var bundle_five =
(window["webpackJsonpbundle_name_"] = window["webpackJsonpbundle_name_"] || []).push([[2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  maps: {
    VSat: L.tileLayer('maps/VSat/{z}/{x}/{y}.png', {
      attribution: 'Los Santos Satellite Map',
      minZoom: 1,
      maxZoom: 6,
      continuousWorld: false,
      noWrap: true,
      errorTileUrl: 'maps/VSat/blank.png'
    }),
    VAtlas: L.tileLayer('maps/VAtlas/{z}/{x}/{y}.png', {
      attribution: 'Los Santos Atlas Map',
      minZoom: 1,
      maxZoom: 6,
      continuousWorld: false,
      noWrap: true,
      errorTileUrl: 'maps/VAtlas/blank.png'
    }),
    VRoad: L.tileLayer('maps/VRoad/{z}/{x}/{y}.png', {
      attribution: 'Los Santos Road Map',
      minZoom: 1,
      maxZoom: 6,
      continuousWorld: false,
      noWrap: true,
      errorTileUrl: 'maps/VRoad/blank.png'
    })
  },
  crs: L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.02133333333, 127.99999998, -0.02133333333, 127.99999998)
  })
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* global bundle_vendor, console */

const Draw = __webpack_require__(0);
const GTAV = __webpack_require__(10);

const mymap = bundle_vendor.L.map('mapid', {
  crs: GTAV.crs,
  maxBounds: [[6500, 6500], [-6500, -6500]],
  layers: [GTAV.maps.VAtlas]
});
mymap.setView([0, 0], 2);

const layers = {
  // Leaflet need's quotes
  /* eslint-disable */
  'Satellite': GTAV.maps.VSat,
  'Road': GTAV.maps.VRoad,
  'Atlas': GTAV.maps.VAtlas
  /* eslint-enable */
};

bundle_vendor.L.control.layers(layers).addTo(mymap);

// const marker =
bundle_vendor.L.marker([0, 0]).addTo(mymap);

const draw = new Draw(mymap);

mymap.on('click', event => {
  console.log(`lat: ${event.latlng.lat};
    lng: ${event.latlng.lng};`);
});

// bundle_vendor.L.easyButton('<i class="fas fa-edit"></i>', () => {
//   editMap();
// }).addTo(mymap);

const app = {
  GTAV,
  mymap,
  debug,
  draw,
  layers
};

module.exports = app;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(9);


/***/ })
],[[12,0]]]);