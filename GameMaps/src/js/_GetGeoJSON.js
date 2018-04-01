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
      style: styleHandler !== undefined ? (feature) => styleHandler(feature.properties.color) : {},
      onEachFeature: onEachFeatureHandler !== undefined ? (feature, layer) => onEachFeatureHandler(feature, layer) : undefined
    });
    if (isAddedToMap) layer.addTo(this.map);
    return layer;
  }
}

module.exports = GetGeoJSON;