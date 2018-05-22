import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { LayerService } from './layer.service';
import { MapConfigService } from './map-config.service';
import { MapService } from './map.service';

describe('MapService', () => {
  @Component({selector: 'app-map', template: '<div id="testmap">'})
  class MapStubComponent {}

  let component: MapStubComponent;
  let fixture: ComponentFixture<MapStubComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [MapStubComponent],
      providers: [MapService, LayerService, MapConfigService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('should render map after initialized', fakeAsync(inject([MapService], (service: MapService) => {
    service.initialize('testmap');
    tick();
    expect((<any>service).map).toBeDefined();
    const mapViewport: HTMLElement = fixture.nativeElement.querySelector('.ol-viewport');
    expect(mapViewport).not.toBeNull();
  })));

  it('#updateMapSize should call spy method map updateSize', inject([MapService], (service: MapService) => {
    (<any>service).map = jasmine.createSpyObj('Map', ['updateSize']);
    service.updateMapSize();
    expect((<any>service).map.updateSize).toHaveBeenCalled();
  }));

  it('#setBasemap should set target basemap visible',  fakeAsync(inject([MapService], (service: MapService) => {
    service.initialize('testmap');
    tick();
    const basemaps = (<any>service).basemaps;
    expect(basemaps['osm'].getVisible()).toBeTruthy();
    expect(basemaps['wkm'].getVisible()).toBeFalsy();
    service.setBasemap('wkm');
    expect(basemaps['osm'].getVisible()).toBeFalsy();
    expect(basemaps['wkm'].getVisible()).toBeTruthy();
  })));

  it('#setOverlayVisibility should set target overlay to be visible or invisible', fakeAsync(inject([MapService], (service: MapService) => {
    service.initialize('testmap');
    tick();
    const overlays = (<any>service).overlays;
    expect(overlays['countries'].getVisible()).toBeTruthy();
    service.setOverlayVisibility('countries', false);
    expect(overlays['countries'].getVisible()).toBeFalsy();
    service.setOverlayVisibility('countries', true);
    expect(overlays['countries'].getVisible()).toBeTruthy();
  })));

  it('#exportAsPNG should call spy saveAs', inject([MapService], (service: MapService) => {
    const mapSpy = jasmine.createSpyObj('Map', ['once', 'renderSync']);
    (<any>service).map = mapSpy;
    mapSpy.once.and.callFake((event: string, callback: Function) => {
      const eventSpy = {
        context: {
          canvas: {
            toBlob: jasmine.createSpy().and.callFake((toBlobCallback: Function) => {
              return toBlobCallback('dummy-blob');
            })
          }
        }
      };
      callback(eventSpy);
    });
    const saveAsSpy = spyOn(FileSaver, 'saveAs');
    service.exportAsPNG();
    expect(saveAsSpy).toHaveBeenCalledWith('dummy-blob', 'map.png');
    expect(mapSpy.renderSync).toHaveBeenCalled();
  }));
});
