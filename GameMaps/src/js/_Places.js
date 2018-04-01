let GetGeoJSON = require('./_GetGeoJSON.js');

class Places {
  constructor(map, jsonFile, isAddedToMap) {
    this.map = map;
    this.layer = new GetGeoJSON(this.map, 'json/SA_Places.json', isAddedToMap, this.popupHandler);
    console.log(this.layer);
  }

  popupHandler(feature, layer) {
    layer.bindPopup(feature.properties.name);
    layer
      .bindPopup(`
        <b>${feature.properties.name}</b><br>
        <p>${feature.properties.description}</p>
      `)
      .setIcon(bundle_vendor.L.icon({
        iconUrl: `img/icons/${feature.properties.icon}.png`,
        iconSize: [16, 16],
      }));
  }
}

module.exports = Places;