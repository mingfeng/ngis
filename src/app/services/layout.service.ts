import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MapService } from './map.service';
import { SidePanelTab } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidePanelVisibility = new BehaviorSubject<boolean>(false);
  detailPanelVisibility = new BehaviorSubject<boolean>(false);
  sidePanelActiveTab = new BehaviorSubject<SidePanelTab>(SidePanelTab.LAYERS);

  constructor(private mapService: MapService) {
    this.mapService.searchResult.subscribe({
      next: () => this.showSearchPanel()
    });
  }

  showLayersPanel() {
    this.sidePanelVisibility.next(true);
    this.sidePanelActiveTab.next(SidePanelTab.LAYERS);
  }

  showSearchPanel() {
    this.sidePanelVisibility.next(true);
    this.sidePanelActiveTab.next(SidePanelTab.SEARCH);
  }

  hideSidePanel() {
    this.sidePanelVisibility.next(false);
  }

  showDetailPanel() {
    this.detailPanelVisibility.next(true);
  }

  hideDetailPanel() {
    this.detailPanelVisibility.next(false);
  }
}
