import { Injectable } from '@angular/core';
import * as ol from 'openlayers';

import { OlMapAdapter } from '../shared/olmap-adapter';
import { Layer, LayerType } from '../shared/layer';
import { LayerService } from './layer.service';

@Injectable()
export class MapService {
  private mapAdapter: OlMapAdapter;
  private _isInitialized = false;

  constructor(private layerService: LayerService) { }

  get isInitialized() {
    return this._isInitialized;
  }

  initialize(mapId: string) {
    this.layerService.getLayers().subscribe((layers) => {
      this.mapAdapter = new OlMapAdapter(mapId, layers);
      this._isInitialized = true;
    });
  }

  updateMapSize() {
    this.mapAdapter.updateMapSize();
  }

  setBasemap(identifier: string) {
    this.mapAdapter.setBasemap(identifier);
  }

  setOverlayVisibility(identifier: string, isVisible: boolean) {
    this.mapAdapter.setOverlayVisibility(identifier, isVisible);
  }
}
