import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { LayersPanelComponent } from './layers-panel.component';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { MapConfigService } from '../services/map-config.service';
import { Layer, LayerType } from '../shared/layer';
import { MAP_CONFIG } from '../shared/mock';

describe('LayersPanelComponent', () => {
  let component: LayersPanelComponent;
  let fixture: ComponentFixture<LayersPanelComponent>;
  let layerServiceSpy: jasmine.SpyObj<LayerService>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;
  let mapConfigServiceSpy: jasmine.SpyObj<MapConfigService>;

  const mockLayers: Layer[] = [{
    type: LayerType.TILE,
    identifier: 'basemap-1',
    name: 'Basemap 1',
    url: '/basemap-1/',
    isBasemap: true
  }, {
    type: LayerType.TILE,
    identifier: 'basemap-2',
    name: 'Basemap 2',
    url: '/basemap-2/',
    isBasemap: true
  }, {
    type: LayerType.WMS,
    identifier: 'overlay-1',
    name: 'Overlayre 1',
    url: '/overlay-1/',
    isBasemap: false
  }];
  beforeEach(async(() => {
    layerServiceSpy = jasmine.createSpyObj('LayerService', ['getLayers']);
    layerServiceSpy.getLayers.and.returnValue(of(mockLayers));
    mapServiceSpy = jasmine.createSpyObj('MapService', ['setBasemap', 'setOverlayVisibility']);
    mapConfigServiceSpy = jasmine.createSpyObj('MapConfigService', ['getMapConfig']);
    mapConfigServiceSpy.getMapConfig.and.returnValue(of(MAP_CONFIG));

    TestBed.configureTestingModule({
      declarations: [ LayersPanelComponent ],
      providers: [
        { provide: LayerService, useValue: layerServiceSpy },
        { provide: MapService, useValue: mapServiceSpy },
        { provide: MapConfigService, useValue: mapConfigServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentBasemap).toEqual('osm');
    expect(component.currentOverlays).toEqual(new Set(['countries']));
  });

  it('#changeBasemap should update currentBasemap and call a map service spy method', () => {
    component.changeBasemap('dummy');
    expect(component.currentBasemap).toBe('dummy');
    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.setBasemap).toHaveBeenCalledWith('dummy');
  });

  it('#toggleOverlay should should turn off overlay if it is turned on', () => {
    component.currentOverlays = new Set(['layer-1', 'layer-2', 'layer-3']);
    fixture.detectChanges();
    component.toggleOverlay('layer-1');
    expect(component.currentOverlays).toEqual(new Set(['layer-2', 'layer-3']));
    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.setOverlayVisibility).toHaveBeenCalledWith('layer-1', false);
  });

  it('#toggleOverlay should turn on layer if it is turned off', () => {
    component.currentOverlays = new Set(['layer-1', 'layer-2']);
    fixture.detectChanges();
    component.toggleOverlay('layer-3');
    expect(component.currentOverlays).toEqual(new Set(['layer-1', 'layer-2', 'layer-3']));
    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.setOverlayVisibility).toHaveBeenCalledWith('layer-3', true);
  });
});
