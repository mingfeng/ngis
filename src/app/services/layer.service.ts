import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Layer, LayerType } from '../shared/layer';
import { LAYERS } from '../shared/mocks';

@Injectable()
export class LayerService {

  constructor() { }

  getLayers(): Observable<Layer[]> {
    return of(LAYERS);
  }
}
