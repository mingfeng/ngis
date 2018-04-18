import * as ol from 'openlayers';

import { OLMapAdapter } from './map-adapter';

describe('OLMapAdapter', () => {
  it('should be created', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapAdapter  = new OLMapAdapter('map', []);
    expect(mapSpy.calls.count()).toBe(1);
  });

  it('should update map size', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapObjectSpy = jasmine.createSpyObj('Map', ['updateSize']);
    const mapAdapter = new OLMapAdapter('map', []);
    (<any>mapAdapter).map = mapObjectSpy;
    mapAdapter.updateMapSize();
    expect(mapObjectSpy.updateSize.calls.count()).toBe(1);
  });
});
