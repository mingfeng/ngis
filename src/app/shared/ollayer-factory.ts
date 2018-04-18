import * as ol from 'openlayers';

import { Layer, LayerType } from './layer';

export default class OlLayerFactory {
  static getOlLayer(layer: Layer): ol.layer.Base {
    switch (layer.type) {
      case LayerType.TILE:
        return OlLayerFactory.getTileLayer(layer);
      case LayerType.WMS:
        return OlLayerFactory.getWMSLayer(layer);
    }
  }

  private static getTileLayer(layer: Layer): ol.layer.Tile {
    return new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: layer.url,
        attributions: layer.attributions
      })
    });
  }

  private static getWMSLayer(layer: Layer): ol.layer.Image {
    return new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: layer.url,
        params: layer.params,
        projection: layer.projection
      })
    });
  }
}
