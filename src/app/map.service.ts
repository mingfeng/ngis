import { Injectable } from '@angular/core';
import * as ol from 'openlayers';

@Injectable()
export class MapService {
  private map: ol.Map;
  private _isInitialized = false;

  constructor() { }

  initialize(mapId: string) {
    this.map = new ol.Map({
      target: mapId,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
    this._isInitialized = true;
  }

  updateMapSize() {
    this.map.updateSize();
  }

  get isInitialized() {
    return this._isInitialized;
  }
}
