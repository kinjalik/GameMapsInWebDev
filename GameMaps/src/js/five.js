/* global bundle_vendor, console */

const Draw = require('./_Draw.js');
const GTAV = require('./_FiveMapPreset.js');


const mymap = bundle_vendor.L.map('mapid', {
  crs: GTAV.crs,
  maxBounds: [
    [6500, 6500],
    [-6500, -6500],
  ],
  layers: [GTAV.maps.VAtlas],
});
mymap.setView([0, 0], 2);

const layers = {
  // Leaflet need's quotes
  /* eslint-disable */
  'Satellite': GTAV.maps.VSat,
  'Road': GTAV.maps.VRoad,
  'Atlas': GTAV.maps.VAtlas,
  /* eslint-enable */
};

bundle_vendor.L.control.layers(layers).addTo(mymap);

// const marker =
bundle_vendor.L.marker([0, 0]).addTo(mymap);

const draw = new Draw(mymap);


mymap.on('click', (event) => {
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
  layers,
};

module.exports = app;
