import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MapConfig } from '../shared/map-config';
import { MAP_CONFIG } from '../shared/mocks';

@Injectable()
export class MapConfigService {

  constructor() { }

  getMapConfig(): Observable<MapConfig> {
    return of(MAP_CONFIG);
  }
}
