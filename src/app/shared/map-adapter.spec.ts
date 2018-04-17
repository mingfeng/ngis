import * as ol from 'openlayers';

import { MapAdapter } from './map-adapter';

describe('MapAdapter', () => {
  it('should be created', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapAdapter  = new MapAdapter('map', []);
    expect(mapSpy.calls.count()).toBe(1);
  });

  it('should update map size', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapObjectSpy = jasmine.createSpyObj('Map', ['updateSize']);
    const mapAdapter = new MapAdapter('map', []);
    (<any>mapAdapter).map = mapObjectSpy;
    mapAdapter.updateMapSize();
    expect(mapObjectSpy.updateSize.calls.count()).toBe(1);
  });
});
