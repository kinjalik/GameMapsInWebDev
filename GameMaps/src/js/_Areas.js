let GetGeoJSON = require('./_GetGeoJSON.js');

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