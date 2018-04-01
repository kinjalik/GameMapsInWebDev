let Debug = require('./_Debug.js');
let Places = require('./_Places.js');
let Draw = require('./_Draw.js');
let Areas = require('./_Areas.js');

let SanAndreas = require('./_SanAndreasMapPreset.js');

let mymap = bundle_vendor.L.map('mapid', {
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


const draw = new Draw(mymap);

const areas = new Areas(mymap, 'json/SA_Police_Jursidictions.json', true);

const places = new Places(mymap, 'json/SA_Places.json', true);

const layers = {
  'Satellite': SanAndreas.maps.SASat,
  'Road': SanAndreas.maps.SARoad,
};

const overlays = {
  'Police Jurisdictions': areas.layer,
  'Locations': places.layer,
};

bundle_vendor.L.control.layers(layers, overlays, {
  collapsed: false,
}).addTo(mymap);

let app = {
  SanAndreas: SanAndreas,
  mymap: mymap,
  debug: debug,
  draw: draw,
  areas: areas,
  places: places,
  layers: layers,
  overlays: overlays
}

module.exports = app;