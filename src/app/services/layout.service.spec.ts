import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { MapService } from './map.service';
import { MainComponent } from '../components/main/main.component';
import { Subject } from 'rxjs';
import { SearchItem } from '../shared/search-item';
import { SidePanelComponent } from '../components/side-panel/side-panel.component';
import { SidePanelTab } from '../shared/side-panel-tabs';

describe('LayoutService', () => {
  let mapService: MapService;
  let layoutService: LayoutService;

  beforeEach(async(() => {
    mapService = new MapService(undefined, undefined);
    layoutService = new LayoutService(mapService);
    TestBed.configureTestingModule({
      providers: [
        { provide: LayoutService, useValue: layoutService },
        { provide: MapService, useValue: mapService }
      ]
    });
  }));

  it('should be created', inject([LayoutService], (service: LayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should show side panel and activate search tab when search result updated', inject([LayoutService], (service: LayoutService) => {
    service.sidePanelVisibility.next(false);
    service.sidePanelActiveTab.next(SidePanelTab.LAYERS);
    mapService.searchResult.next([]);
    expect(service.sidePanelVisibility.getValue()).toBeTruthy();
    expect(service.sidePanelActiveTab.getValue()).toBe(SidePanelTab.SEARCH);
  }));

  it('#showLayersPanel should show side panel and activate layers tab', inject([LayoutService], (service: LayoutService) => {
    service.sidePanelVisibility.next(false);
    service.sidePanelActiveTab.next(SidePanelTab.SEARCH);
    service.showLayersPanel();
    expect(service.sidePanelVisibility.getValue()).toBeTruthy();
    expect(service.sidePanelActiveTab.getValue()).toBe(SidePanelTab.LAYERS);
  }));

  it('#showSearchPanel should show side panel and activate search tab', inject([LayoutService], (service: LayoutService) => {
    service.sidePanelVisibility.next(false);
    service.sidePanelActiveTab.next(SidePanelTab.LAYERS);
    service.showSearchPanel();
    expect(service.sidePanelVisibility.getValue()).toBeTruthy();
    expect(service.sidePanelActiveTab.getValue()).toBe(SidePanelTab.SEARCH);
  }));

  it('#hideSearchPanel should hide side panel', inject([LayoutService], (service: LayoutService) => {
    service.sidePanelVisibility.next(true);
    service.hideSidePanel();
    expect(service.sidePanelVisibility.getValue()).toBeFalsy();
  }));

  it('#showDetailPanel should show detail panel', inject([LayoutService], (service: LayoutService) => {
    service.detailPanelVisibility.next(false);
    service.showDetailPanel();
    expect(service.detailPanelVisibility.getValue()).toBeTruthy();
  }));

  it('#hideDetailPanel should hide detail panel', inject([LayoutService], (service: LayoutService) => {
    service.detailPanelVisibility.next(true);
    service.hideDetailPanel();
    expect(service.detailPanelVisibility.getValue()).toBeFalsy();
  }));
});
