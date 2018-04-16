import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MapService } from './map.service';

describe('MapService', () => {
  @Component({selector: 'app-map', template: '<div id="testmap">'})
  class MapStubComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapStubComponent],
      providers: [MapService]
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('should be initialized', inject([MapService], (service: MapService) => {
    service.initialize('testmap');
    expect(service.isInitialized).toBeTruthy();
  }));

  it('should update map size', inject([MapService], (service: MapService) => {
    const mapAdapterSpy = jasmine.createSpyObj('MapAdapter', ['updateMapSize']);
    (<any> service).mapAdapter = mapAdapterSpy;
    service.updateMapSize();
    expect(mapAdapterSpy.updateMapSize.calls.count()).toBe(1);
  }));
});
