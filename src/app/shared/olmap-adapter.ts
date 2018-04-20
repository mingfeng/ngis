import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';
import OlLayerFactory from './ollayer-factory';

export class OlMapAdapter {
  private map: ol.Map;
  private basemaps: {[identifier: string]: ol.layer.Base};
  private overlays: {[identifier: string]: ol.layer.Base};

  constructor(target: string, layers: Layer[]) {
    this.basemaps = layers.filter(layer => layer.isBasemap).reduce((basemaps, layer) => {
      basemaps[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return basemaps;
    }, {});
    this.overlays = layers.filter(layer => !layer.isBasemap).reduce((overlays, layer) => {
      overlays[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return overlays;
    }, {});

    this.map = new ol.Map({
      target,
      layers: Object.values(this.basemaps).concat(Object.values(this.overlays)),
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 4
      })
    });
  }

  updateMapSize() {
    this.map.updateSize();
  }

  setBasemap(identifier) {
    for (const [key, layer] of Object.entries(this.basemaps)) {
      if (key === identifier) {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    }
  }

  setOverlayVisibility(identifier, isVisible) {
    const layer = this.overlays[identifier];
    layer.setVisible(isVisible);
  }
}
