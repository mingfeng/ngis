import { TestBed, async, inject } from '@angular/core/testing';
import { SidePanelTab } from '../shared/enums';
import { LayoutService } from './layout.service';
import { MapService } from './map.service';


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
