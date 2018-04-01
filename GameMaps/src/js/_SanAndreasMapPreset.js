module.exports = {
  maps: {
    SASat: bundle_vendor.L.tileLayer('maps/SASat/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Satellite Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true,
    }),
    SARoad: bundle_vendor.L.tileLayer('maps/SARoad/{z}/{x}/{y}.png', {
      attribution: 'San Andreas Atlus Map',
      minZoom: 1,
      maxZoom: 5,
      continuousWorld: false,
      noWrap: true,
    }),
  },
  crs: bundle_vendor.L.extend({}, bundle_vendor.L.CRS.Simple, {
    transformation: new bundle_vendor.L.Transformation(0.04266666666, 127.99999998, -0.04266666666, 127.99999998),
  }),
  coordsTranslator: (outputData, data) => {
    if (data instanceof Object && !(data instanceof Array)) {
      debug.log('log', 'Coords converter got:', 'Object');
      return [data.lng.toFixed(4), data.lat.toFixed(4)];
    } else if (data instanceof Array) {
      debug.log('log', 'Coords converter got:', 'Array');
      return [data[1].toFixed(4), data[0].toFixed(4)];
    } else {
      debug.log('error', 'Coordinates are not correct', '');
    }
  },
};