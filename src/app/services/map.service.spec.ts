import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MapService } from './map.service';
import { LayerService } from './layer.service';
import { OlMapAdapter } from '../shared/olmap-adapter';
import { MapConfigService } from './map-config.service';

describe('MapService', () => {
  @Component({selector: 'app-map', template: '<div id="testmap">'})
  class MapStubComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapStubComponent],
      providers: [MapService, LayerService, MapConfigService]
    });
  });

  let mapAdapterSpy: jasmine.SpyObj<OlMapAdapter>;
  beforeEach(() => {
    mapAdapterSpy = jasmine.createSpyObj('OlMapAdapter', ['updateMapSize', 'setBasemap', 'setOverlayVisibility']);
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('#initialize should set isInitialied to true', inject([MapService], (service: MapService) => {
    service.initialize('testmap');
    expect(service.isInitialized).toBeTruthy();
  }));

  it('#updateMapSize should call spy updateMapSize', inject([MapService], (service: MapService) => {
    (<any> service).mapAdapter = mapAdapterSpy;
    service.updateMapSize();
    expect(mapAdapterSpy.updateMapSize).toHaveBeenCalledTimes(1);
  }));

  it('#setBasemap should call spy setBasemap', inject([MapService], (service: MapService) => {
    (<any> service).mapAdapter = mapAdapterSpy;
    service.setBasemap('basemap');
    expect(mapAdapterSpy.setBasemap).toHaveBeenCalledWith('basemap');
  }));

  it('#setOverlayVisibility should call spy setOverlayVisibility', inject([MapService], (service: MapService) => {
    (<any> service).mapAdapter = mapAdapterSpy;
    service.setOverlayVisibility('overlay', true);
    expect(mapAdapterSpy.setOverlayVisibility).toHaveBeenCalledWith('overlay', true);
  }));
});
