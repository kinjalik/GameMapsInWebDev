const buffer = require('copy-text-to-clipboard');
const L = require('leaflet'); 
const leafletDraw = require('leaflet-draw');
const leafletEasyButton = require('leaflet-easybutton');

let app = {
	buffer: buffer,
	L: L,
	LfDraw: leafletDraw,
	LfEasyButton: leafletEasyButton
}

module.exports = app;