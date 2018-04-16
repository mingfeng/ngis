import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import { MapAdapter } from './map-adapter';
import { Layer, LayerType } from './layer';
import { LayerService } from './layer.service';

@Injectable()
export class MapService {
  private mapAdapter: MapAdapter;
  private _isInitialized = false;

  constructor(private layerService: LayerService) { }

  initialize(mapId: string) {
    this.layerService.getLayers().subscribe((layers) => {
      this.mapAdapter = new MapAdapter(mapId, layers);
      this._isInitialized = true;
    });
  }

  updateMapSize() {
    this.mapAdapter.updateMapSize();
  }

  get isInitialized() {
    return this._isInitialized;
  }
}
