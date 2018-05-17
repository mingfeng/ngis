import { Component, OnInit } from '@angular/core';

import { MapService } from '../../services/map.service';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent implements OnInit {
  currentInteraction = '';

  constructor(private mapService: MapService, private layoutService: LayoutService) { }

  ngOnInit() {
  }

  showLayersPanel() {
    this.layoutService.showLayersPanel();
  }

  showSearchPanel() {
    this.layoutService.showSearchPanel();
  }

  reset() {
    this.currentInteraction = '';
    this.mapService.resetInteraction();
  }

  boxSearch() {
    this.currentInteraction = 'box-search';
    this.mapService.activateDragBox();
  }

  draw() {
    this.currentInteraction = 'draw';
    this.mapService.activateDraw();
  }

  modify() {
    this.currentInteraction = 'modify';
    this.mapService.activateModify();
  }

  exportAsPNG() {
    this.mapService.exportAsPNG();
  }
}
