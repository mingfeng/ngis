import * as ol from 'openlayers';

import { OlMapAdapter } from './olmap-adapter';
import { LAYERS, MAP_CONFIG } from './mocks';
import OlLayerFactory from './ollayer-factory';

describe('OLMapAdapter', () => {
  let mapContractorSpy: jasmine.Spy;
  let mapObjectSpy: jasmine.SpyObj<ol.Map>;
  let mapAdapter: OlMapAdapter;

  beforeEach(() => {
    mapContractorSpy = spyOn(ol, 'Map');
    mapObjectSpy = jasmine.createSpyObj('Map', ['updateSize', 'once', 'renderSync']);
    mapContractorSpy.and.returnValue(mapObjectSpy);
    mapAdapter  = new OlMapAdapter('map', LAYERS, MAP_CONFIG);
  });

  it('should be created', () => {
    expect(mapContractorSpy.calls.count()).toBe(1);
  });

  it('#updateSize should call a spy method', () => {
    mapAdapter.updateMapSize();
    expect(mapObjectSpy.updateSize.calls.count()).toBe(1);
  });

  it('#setBasemap should set given basemap visible and other basemaps invisible', () => {
    const basemaps = (<any>mapAdapter).basemaps;
    basemaps['osm'].setVisible(true);
    basemaps['wkm'].setVisible(false);
    mapAdapter.setBasemap('wkm');
    expect(basemaps['osm'].getVisible()).toBe(false);
    expect(basemaps['wkm'].getVisible()).toBe(true);
  });

  it('#setOverlayVisibility should set given overlay\'s visibility', () => {
    const overlays = (<any>mapAdapter).overlays;
    overlays['countries'].setVisible(true);
    mapAdapter.setOverlayVisibility('countries', false);
    expect(overlays['countries'].getVisible()).toBe(false);
    mapAdapter.setOverlayVisibility('countries', true);
    expect(overlays['countries'].getVisible()).toBe(true);
  });

  it('#resetInteraction should deactivate all interactions', () => {
    const featureCollection = (<any>mapAdapter).select.getFeatures();
    const clearSpy = spyOn(featureCollection, 'clear');
    const selectSetActiveSpy = spyOn((<any>mapAdapter).select, 'setActive');
    const modifySetActiveSpy = spyOn((<any>mapAdapter).modify, 'setActive');
    const drawSetActiveSpy = spyOn((<any>mapAdapter).draw, 'setActive');
    mapAdapter.resetInteraction();
    expect(clearSpy).toHaveBeenCalled();
    expect(selectSetActiveSpy).toHaveBeenCalledWith(false);
    expect(modifySetActiveSpy).toHaveBeenCalledWith(false);
    expect(drawSetActiveSpy).toHaveBeenCalledWith(false);
  });

  it('#activateDraw should deactive select and modify and activate draw', () => {
    const selectSetActiveSpy = spyOn((<any>mapAdapter).select, 'setActive');
    const modifySetActiveSpy = spyOn((<any>mapAdapter).modify, 'setActive');
    const drawSetActiveSpy = spyOn((<any>mapAdapter).draw, 'setActive');
    mapAdapter.activateDraw();
    expect(selectSetActiveSpy).toHaveBeenCalledWith(false);
    expect(modifySetActiveSpy).toHaveBeenCalledWith(false);
    expect(drawSetActiveSpy).toHaveBeenCalledWith(true);
  });

  it('#activateModify should deactivate draw and activate select and modify', () => {
    const selectSetActiveSpy = spyOn((<any>mapAdapter).select, 'setActive');
    const modifySetActiveSpy = spyOn((<any>mapAdapter).modify, 'setActive');
    const drawSetActiveSpy = spyOn((<any>mapAdapter).draw, 'setActive');
    mapAdapter.activateModify();
    expect(selectSetActiveSpy).toHaveBeenCalledWith(true);
    expect(modifySetActiveSpy).toHaveBeenCalledWith(true);
    expect(drawSetActiveSpy).toHaveBeenCalledWith(false);
  });

  it('#exportAsPNG should call spy once and renderSync', () => {
    mapAdapter.exportAsPNG();
    expect(mapObjectSpy.once).toHaveBeenCalledWith('postcompose', jasmine.any(Function));
    expect(mapObjectSpy.renderSync).toHaveBeenCalled();
  });
});
