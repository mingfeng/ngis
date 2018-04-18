import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';

export class OLMapAdapter {
  private map: ol.Map;

  constructor(target: string, layers: Layer[]) {
    const mapLayers = layers.map((layer) => this.createMapLayer(layer));
    this.map = new ol.Map({
      target,
      layers: mapLayers,
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 4
      })
    });
  }

  private createMapLayer(layer: Layer): ol.layer.Base {
    if (layer.type === LayerType.TILE) {
      return new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: layer.url,
          attributions: layer.attributions
        })
      });
    } else if (layer.type === LayerType.WMS) {
      return new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: layer.url,
          params: layer.params,
          projection: layer.projection
        })
      });
    }
  }

  updateMapSize() {
    this.map.updateSize();
  }
}
