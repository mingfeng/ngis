import * as ol from 'openlayers';

import { OlMapAdapter } from './olmap-adapter';

describe('OLMapAdapter', () => {
  it('should be created', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapAdapter  = new OlMapAdapter('map', []);
    expect(mapSpy.calls.count()).toBe(1);
  });

  it('should update map size', () => {
    const mapSpy = spyOn(ol, 'Map');
    const mapObjectSpy = jasmine.createSpyObj('Map', ['updateSize']);
    const mapAdapter = new OlMapAdapter('map', []);
    (<any>mapAdapter).map = mapObjectSpy;
    mapAdapter.updateMapSize();
    expect(mapObjectSpy.updateSize.calls.count()).toBe(1);
  });
});
