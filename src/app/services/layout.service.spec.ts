import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { MapService } from './map.service';
import { MainComponent } from '../components/main/main.component';

describe('LayoutService', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  @Component({selector: 'app-map', template: ''})
  class MapStubComponent {}

  @Component({selector: 'app-side-panel', template: ''})
  class SidePanelStubComponent {}

  @Component({selector: 'app-country-detail', template: ''})
  class CountryDetailStubComponent {}

  const mapServiceSpy = jasmine.createSpyObj('MapService', ['updateMapSize']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MapStubComponent,
        SidePanelStubComponent,
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

  it('#showSidePanel should display side panel (style display is empty)', inject([LayoutService], (service: LayoutService) => {
    service.showSidePanel();
    const sidePanelColumn: HTMLElement = fixture.nativeElement.querySelector('#side-panel-col');
    expect(sidePanelColumn.style.display).toBe('');
    expect(mapServiceSpy.updateMapSize).toHaveBeenCalledTimes(1);
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
