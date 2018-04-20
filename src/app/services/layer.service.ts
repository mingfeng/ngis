import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Layer, LayerType } from '../shared/layer';
import { LAYERS } from '../shared/mock';

@Injectable()
export class LayerService {

  constructor() { }

  getLayers(): Observable<Layer[]> {
    return of(LAYERS);
  }
}
