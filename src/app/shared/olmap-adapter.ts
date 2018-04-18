import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';
import OlLayerFactory from './ollayer-factory';

export class OlMapAdapter {
  private map: ol.Map;

  constructor(target: string, layers: Layer[]) {
    const mapLayers = layers.map((layer) => this.createOlLayer(layer));
    this.map = new ol.Map({
      target,
      layers: mapLayers,
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 4
      })
    });
  }

  private createOlLayer(layer: Layer): ol.layer.Base {
    return OlLayerFactory.getOlLayer(layer);
  }

  updateMapSize() {
    this.map.updateSize();
  }
}
