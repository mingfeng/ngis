import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Layer, LayerType } from '../shared/layer';

const LAYERS = [{
  type: LayerType.TILE,
  identifier: 'osm',
  name: 'OpenStreetMap',
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  isBasemap: true
}];

@Injectable()
export class LayerService {

  constructor() { }

  getLayers(): Observable<Layer[]> {
    return of(LAYERS);
  }
}
