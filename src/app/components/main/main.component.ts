import { Component, AfterViewInit  } from '@angular/core';

import { MapService } from '../../services/map.service';
import { LayoutService } from '../../services/layout.service';

const FULL_SIZE = 100;
const DEFAULT_SIDE_PANEL_SIZE = 15;
const DEFAULT_DETAIL_PANEL_SIZE = 20;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit  {
  isSidePanelVisible = false;
  isDetailPanelVisible = false;

  constructor(private mapService: MapService, private layoutService: LayoutService) {}

  get sidePanelSize() {
    return this.isSidePanelVisible ? DEFAULT_SIDE_PANEL_SIZE : 0;
  }

  get detailPanelSize() {
    return this.isDetailPanelVisible ? DEFAULT_DETAIL_PANEL_SIZE : 0;
  }

  get mapAreaSize() {
    return FULL_SIZE - this.sidePanelSize - this.detailPanelSize;
  }

  ngAfterViewInit() {
    this.layoutService.sidePanelVisibility.subscribe({
      next: isVisible => this.isSidePanelVisible = isVisible
    });
    this.layoutService.detailPanelVisibility.subscribe({
      next: isVisible => this.isDetailPanelVisible = isVisible
    });
  }

  onDragProgress() {
    this.mapService.updateMapSize();
  }

  onDragEnd() {
    this.mapService.updateMapSize();
  }

  onTransitionEnd() {
    this.mapService.updateMapSize();
  }
}
