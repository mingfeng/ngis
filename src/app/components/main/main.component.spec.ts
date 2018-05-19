import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MainComponent } from './main.component';
import { MapService } from '../../services/map.service';
import { LayoutService } from '../../services/layout.service';
import { AngularSplitModule } from 'angular-split';

describe('MainComponent', () => {

  @Component({selector: 'app-map', template: ''})
  class MapStubComponent {}

  @Component({selector: 'app-side-panel', template: ''})
  class SidePanelStubComponent {}

  @Component({selector: 'app-country-detail', template: ''})
  class CountryDetailStubComponent {}

  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mapService: MapService;
  let layoutService: LayoutService;

  beforeEach(async(() => {
    mapService = new MapService(undefined, undefined);
    layoutService = new LayoutService(mapService);
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MapStubComponent,
        SidePanelStubComponent,
        CountryDetailStubComponent
      ],
      imports: [
        AngularSplitModule
      ],
      providers: [
        { provide: MapService, useValue: mapService },
        { provide: LayoutService, useValue: layoutService }
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

  it('#onDragProgress should call spy map serice updateMapSize', () => {
    const updateMapSizeSpy = spyOn(mapService, 'updateMapSize');
    component.onDragProgress();
    expect(updateMapSizeSpy).toHaveBeenCalled();
  });

  it('#onDragEnd should call spy map service updateMapSize', () => {
    const updateMapSizeSpy = spyOn(mapService, 'updateMapSize');
    component.onDragEnd();
    expect(updateMapSizeSpy).toHaveBeenCalled();
  });

  it('#onTransitionEnd should call spy map service updateMapSize', () => {
    const updateMapSizeSpy = spyOn(mapService, 'updateMapSize');
    component.onTransitionEnd();
    expect(updateMapSizeSpy).toHaveBeenCalled();
  });
});
