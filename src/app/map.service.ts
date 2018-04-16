import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import { MapAdapter } from './map-adapter';
import { Layer, LayerType } from './layer';

@Injectable()
export class MapService {
  private mapAdapter: MapAdapter;
  private _isInitialized = false;

  constructor() { }

  initialize(mapId: string) {
    const layers: Layer[] = [{
      type: LayerType.TILE,
      identifier: 'osm',
      name: 'OpenStreetMap',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      isBasemap: true
    }];
    this.mapAdapter = new MapAdapter(mapId, layers);
    this._isInitialized = true;
  }

  updateMapSize() {
    this.mapAdapter.updateMapSize();
  }

  get isInitialized() {
    return this._isInitialized;
  }
}
