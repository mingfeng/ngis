import { Injectable } from '@angular/core';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlTileLayer from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

@Injectable()
export class MapService {
  map: OlMap;

  constructor() { }

  initMap(mapId: string) {
    this.map = new OlMap({
      target: mapId,
      layers: [
        new OlTileLayer({
          source: new OlSourceOsm()
        })
      ],
      view: new OlView({
        center: OlProj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }

}
