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
      transformation: new L.Transformation(0.02133333333, 127.99999998, -0.02133333333, 127.99999998),
    }),
  }