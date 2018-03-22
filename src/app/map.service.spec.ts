import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { MapService } from './map.service';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [MapService]
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('should be initialized', inject([MapService], (service: MapService) => {
    const fixture: ComponentFixture<MapComponent> = TestBed.createComponent(MapComponent);
    const component = fixture.componentInstance;
    service.initialize(component.mapId);
    expect(service.isInitialized).toBeTruthy();
  }));

});
