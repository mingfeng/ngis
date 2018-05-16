import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapService } from './map.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private mapService: MapService) { }

  showSidePanel() {
    $('#side-panel-col').show();
    this.mapService.updateMapSize();
  }

  hideSidePanel() {
    $('#side-panel-col').hide();
    this.mapService.updateMapSize();
  }

  showDetailPanel() {
    $('#detail-panel-col').show();
    this.mapService.updateMapSize();
  }

  hideDetailPanel() {
    $('#detail-panel-col').hide();
    this.mapService.updateMapSize();
  }
}
