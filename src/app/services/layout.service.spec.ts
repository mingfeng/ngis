import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { MapService } from './map.service';
import { MainComponent } from '../components/main/main.component';
import { Subject } from 'rxjs';
import { SearchItem } from '../shared/search-item';
import { SidePanelComponent } from '../components/side-panel/side-panel.component';

describe('LayoutService', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  @Component({selector: 'app-map', template: ''})
  class MapStubComponent {}

  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  @Component({selector: 'app-layers-panel', template: ''})
  class LayersPanelStubComponent {}

  @Component({selector: 'app-country-detail', template: ''})
  class CountryDetailStubComponent {}

  const mapServiceSpy = jasmine.createSpyObj('MapService', ['updateMapSize']);
  mapServiceSpy.searchResult = new Subject<SearchItem[]>();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MapStubComponent,
        SidePanelComponent,
        LayersPanelStubComponent,
        SearchPanelStubComponent,
        CountryDetailStubComponent
      ],
      providers: [
        LayoutService,
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mapServiceSpy.updateMapSize.calls.reset();
  });

  it('should be created', inject([LayoutService], (service: LayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should show search panel if map service search result is updated', inject([LayoutService], (service: LayoutService) => {
    mapServiceSpy.searchResult.next([]);
    const layersTab: HTMLElement = fixture.nativeElement.querySelector('#layers-tab');
    expect(layersTab.classList.contains('active')).toBeFalsy();
    const searchTab: HTMLElement = fixture.nativeElement.querySelector('#search-tab');
    expect(searchTab.classList.contains('active')).toBeTruthy();
  }));

  it('#showLayersPanel should show layers panel', inject([LayoutService], (service: LayoutService) => {
    service.showLayersPanel();
    const layersTab: HTMLElement = fixture.nativeElement.querySelector('#layers-tab');
    expect(layersTab.classList.contains('active')).toBeTruthy();
    const searchTab: HTMLElement = fixture.nativeElement.querySelector('#search-tab');
    expect(searchTab.classList.contains('active')).toBeFalsy();
  }));

  it('#showSearchPanel should show search panel', inject([LayoutService], (service: LayoutService) => {
    service.showSearchPanel();
    const layersTab: HTMLElement = fixture.nativeElement.querySelector('#layers-tab');
    expect(layersTab.classList.contains('active')).toBeFalsy();
    const searchTab: HTMLElement = fixture.nativeElement.querySelector('#search-tab');
    expect(searchTab.classList.contains('active')).toBeTruthy();
  }));

  it('#hideSidePanel should hide side panel (style display is "none")', inject([LayoutService], (service: LayoutService) => {
    service.hideSidePanel();
    const sidePanelColumn: HTMLElement = fixture.nativeElement.querySelector('#side-panel-col');
    expect(sidePanelColumn.style.display).toBe('none');
    expect(mapServiceSpy.updateMapSize).toHaveBeenCalledTimes(1);
  }));

  it('#showDetailPanel should display detail panel (style display is empty', inject([LayoutService], (service: LayoutService) => {
    service.showDetailPanel();
    const detailPanelColumn: HTMLElement = fixture.nativeElement.querySelector('#detail-panel-col');
    expect(detailPanelColumn.style.display).toBe('');
    expect(mapServiceSpy.updateMapSize).toHaveBeenCalledTimes(1);
  }));

  it('#hideDetailPanel should hide detail panel (style display is "none")', inject([LayoutService], (service: LayoutService) => {
    service.hideDetailPanel();
    const detailPanelColumn: HTMLElement = fixture.nativeElement.querySelector('#detail-panel-col');
    expect(detailPanelColumn.style.display).toBe('none');
    expect(mapServiceSpy.updateMapSize).toHaveBeenCalledTimes(1);
  }));
});
