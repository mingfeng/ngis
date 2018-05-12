import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MapService } from './map.service';
import { LayerService } from './layer.service';
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

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

});
