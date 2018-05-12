import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import * as ol from 'openlayers';

import { OlMapAdapter } from '../shared/olmap-adapter';
import { Layer, LayerType } from '../shared/layer';
import { LayerService } from './layer.service';
import { MapConfigService } from './map-config.service';
import { SearchItem } from '../shared/search-item';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapAdapter: OlMapAdapter;
  searchResult: Subject<SearchItem[]> = new Subject<SearchItem[]>();

  constructor(private layerService: LayerService, private mapConfigService: MapConfigService) { }

  initialize(mapId: string) {
    forkJoin(
      this.layerService.getLayers(),
      this.mapConfigService.getMapConfig()
    ).subscribe(([layers, mapConfig]) => {
      this.mapAdapter = new OlMapAdapter(mapId, layers, mapConfig);
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

  selectSearchItem(searchItem: SearchItem) {
    this.mapAdapter.selectSearchItem(searchItem);
  }

  searchByText(text: string) {
    const searchItems = this.mapAdapter.searchByText(text);
    this.searchResult.next(searchItems);
  }
}
