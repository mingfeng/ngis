import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';
import { MapConfig } from './map-config';
import OlLayerFactory from './ollayer-factory';

export class OlMapAdapter {
  private map: ol.Map;
  private basemaps: {[identifier: string]: ol.layer.Base};
  private overlays: {[identifier: string]: ol.layer.Base};

  constructor(target: string, layers: Layer[], mapConfig: MapConfig) {
    this.basemaps = layers.filter(layer => layer.isBasemap).reduce((basemaps, layer) => {
      basemaps[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return basemaps;
    }, {});
    this.overlays = layers.filter(layer => !layer.isBasemap).reduce((overlays, layer) => {
      overlays[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return overlays;
    }, {});

    this.basemaps[mapConfig.activeBasemap].setVisible(true);
    mapConfig.activeOverlays.forEach(identifier => this.overlays[identifier].setVisible(true));

    this.map = new ol.Map({
      target,
      layers: Object.values(this.basemaps).concat(Object.values(this.overlays)),
      view: new ol.View({
        center: ol.proj.fromLonLat(mapConfig.center),
        zoom: mapConfig.zoom
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
