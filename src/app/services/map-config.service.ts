import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { MapConfig } from '../shared/map-config';
import { MAP_CONFIG } from '../shared/mocks';

@Injectable()
export class MapConfigService {

  constructor() { }

  getMapConfig(): Observable<MapConfig> {
    return of(MAP_CONFIG);
  }
}
