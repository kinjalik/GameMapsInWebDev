class Draw {
  constructor(map) {
    this.editPanelShown = false;
    this.control(map);
  }

  editMap(map) {
    if (!this.editPanelShown) {
      this.editPanelShown = true;
      this.drawnItems = new bundle_vendor.L.FeatureGroup();
      map.addLayer(this.drawnItems);

      map.addControl(new bundle_vendor.L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
          },
        },
      }));

      map.on(bundle_vendor.L.Draw.Event.CREATED, (event) => {
        const layer = event.layer.addTo(map);
        const geoJSON = layer.toGeoJSON();
        geoJSON.properties = this.getProps('Нет описания');
        bundle_vendor.buffer(JSON.stringify(geoJSON));
        alert('Данные GeoJSON объекта скопированы');
      });
    }
  }

  getProps(noDescMsg) {
    let name = prompt('Введите название точки');
    let desc = prompt('Введите описание точки.\nЕсли нет описание/желания писать его - нажмите "отмена"');
    if (desc === null || desc === '' || desc === undefined || desc === false) {
      desc = noDescMsg;
    }
    return {
      name: name,
      description: desc
    }
  }

  control(map) {
    bundle_vendor.L.easyButton('<i class="fas fa-edit"></i>', () => {
      this.editMap(map);
    }).addTo(map);
  }
}

module.exports = Draw;