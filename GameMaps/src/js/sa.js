/* global bundle_style, bundle_vendor */

const Debug = require('./_Debug.js');
const Places = require('./_Places.js');
const Draw = require('./_Draw.js');
const Areas = require('./_Areas.js');

const SanAndreas = require('./_SanAndreasMapPreset.js');

const mymap = bundle_vendor.L.map('mapid', {
  crs: SanAndreas.crs,
  maxBounds: [
    [3500, 3500],
    [-3500, -3500],
  ],
  layers: [SanAndreas.maps.SASat],
});
mymap.setView([0, 0], 2);


const debug = new Debug(true, {
  showCoordinates: true,
  logging: false,
});


const draw = new Draw(mymap);

const areas = new Areas(mymap, 'json/SA_Police_Jursidictions.json', true);

const places = new Places(mymap, 'json/SA_Places.json', true);

const layers = {
  // Leaflet need's quotes
  /* eslint-disable */
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad,
  /* eslint-enable */
};

const overlays = {
  /* eslint-disable */
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer,
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
  overlays,
};

module.exports = app;
