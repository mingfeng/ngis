import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';

export class MapAdapter {
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

  createMapLayer(layer: Layer): ol.layer.Base {
    if (layer.type === LayerType.TILE) {
      return new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: layer.url,
          attributions: layer.attributions
        })
      });
    }
  }

  updateMapSize() {
    this.map.updateSize();
  }
}