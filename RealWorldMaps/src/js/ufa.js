const mapsCollection = require('./_mapsCollection.js');

const mymap = bundle_vendor.L.map('mapid', {
	center: [54.720673, 55.949335],
	zoom: 13,
	layers: [mapsCollection.mapBoxSchema],
});

const baseLayers = {
	'Схема от Mapbox': mapsCollection.mapBoxSchema,
	'Спутник от Bing': mapsCollection.bingSat,
	'Схема от ESRI': mapsCollection.esriSchema,
	'Спутник от ESRI': mapsCollection.esriSat,
	'Схема от HERE': mapsCollection.HERE_normalDay,
	'Схема от OpenToolMap': mapsCollection.OpenToolMap,
	'Схема от Google Maps': mapsCollection.googleStreets,
	'Спутник от Google Maps': mapsCollection.googleSat,
	'Физическая от Google Maps': mapsCollection.googleTerrain,
	'Гибрид от Google Maps': mapsCollection.googleHybrid,
}

console.log(baseLayers);
bundle_vendor.L.control.layers(baseLayers).addTo(mymap);

const search = require('./_search.js')(mymap, 'AIzaSyCFl_qX8EFJmRlu8Ix27a6ECSlBBnBCN34');

// TEMP 

const geocoder = require('./_geocoder.js')(mymap);

