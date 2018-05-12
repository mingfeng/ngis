import * as ol from 'openlayers';

import { Layer, LayerType } from '../shared/layer';

export default class OlLayerFactory {
  static getOlLayer(layer: Layer): ol.layer.Base {
    switch (layer.type) {
      case LayerType.TILE:
        return OlLayerFactory.getTileLayer(layer);
      case LayerType.VECTOR:
        return OlLayerFactory.getVectorLayer(layer);
    }
  }

  private static getTileLayer(layer: Layer): ol.layer.Tile {
    return new ol.layer.Tile({
      visible: false,
      source: new ol.source.XYZ({
        url: layer.url,
        attributions: layer.attributions,
        crossOrigin: 'Anonymous'
      })
    });
  }

  private static getVectorLayer(layer: Layer): ol.layer.Image {
    return new ol.layer.Vector({
      visible: false,
      source: new ol.source.Vector({
        url: layer.url,
        format:  new ol.format.GeoJSON()
      })
    });
  }
}
