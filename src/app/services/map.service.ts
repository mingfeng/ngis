import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as ol from 'openlayers';

import { OlMapAdapter } from '../shared/olmap-adapter';
import { Layer, LayerType } from '../shared/layer';
import { LayerService } from './layer.service';
import { MapConfigService } from './map-config.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapAdapter: OlMapAdapter;
  private _isInitialized = false;

  constructor(private layerService: LayerService, private mapConfigService: MapConfigService) { }

  get isInitialized() {
    return this._isInitialized;
  }

  initialize(mapId: string) {
    forkJoin(
      this.layerService.getLayers(),
      this.mapConfigService.getMapConfig()
    ).subscribe(([layers, mapConfig]) => {
      this.mapAdapter = new OlMapAdapter(mapId, layers, mapConfig);
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

  resetInteraction() {
    this.mapAdapter.resetInteraction();
  }

  activateDraw() {
    this.mapAdapter.activateDraw();
  }

  activateModify() {
    this.mapAdapter.activateModify();
  }

  exportAsPNG() {
    this.mapAdapter.exportAsPNG();
  }
}
