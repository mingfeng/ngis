import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MainComponent } from './main.component';
import { MapService } from '../../services/map.service';
import { LayoutService } from '../../services/layout.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  @Component({selector: 'app-map', template: ''})
  class MapStubComponent {}

  @Component({selector: 'app-side-panel', template: ''})
  class SidePanelStubComponent {}

  @Component({selector: 'app-country-detail', template: ''})
  class CountryDetailStubComponent {}

  const layoutService = new LayoutService();
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
        { provide: LayoutService, useValue: layoutService },
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide side panel column and detail panel column on start', () => {
    const sidePanelColumn = fixture.nativeElement.querySelector('#side-panel-col');
    expect(sidePanelColumn.classList.contains('d-none')).toBeTruthy();
    const detailpanelColumn = fixture.nativeElement.querySelector('#detail-panel-col');
    expect(detailpanelColumn.classList.contains('d-none')).toBeTruthy();
  });

  it('should show/hide side panel column when layout service calls showSidePanel/hideSidePanel', () => {
    const sidePanelColumn = fixture.nativeElement.querySelector('#side-panel-col');

    layoutService.showSidePanel();
    fixture.detectChanges();
    expect(sidePanelColumn.classList.contains('d-none')).toBeFalsy();

    layoutService.hideSidePanel();
    fixture.detectChanges();
    expect(sidePanelColumn.classList.contains('d-none')).toBeTruthy();
  });

  it('should show/hide detail panel column when layout service calls showDetailPanel/hideDetailPanel', () => {
    const detailpanelColumn = fixture.nativeElement.querySelector('#detail-panel-col');

    layoutService.showDetailPanel();
    fixture.detectChanges();
    expect(detailpanelColumn.classList.contains('d-none')).toBeFalsy();

    layoutService.hideDetailPanel();
    fixture.detectChanges();
    expect(detailpanelColumn.classList.contains('d-none')).toBeTruthy();
  });

  it('should call update map size after layout is updated', () => {
    layoutService.showSidePanel();
    layoutService.hideSidePanel();
    layoutService.showDetailPanel();
    layoutService.hideDetailPanel();
    expect(mapServiceSpy.updateMapSize).toHaveBeenCalledTimes(4);
  });
});
