import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layer, VectorFormat } from '../shared/interfaces';
import { LAYERS, VECTOR_FORMATS } from '../shared/mocks';
import { LayerType } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor() { }

  getLayers(): Observable<Layer[]> {
    return of(LAYERS);
  }

  getVectorLayers(): Observable<Layer[]> {
    return of(LAYERS.filter(layer => layer.type === LayerType.VECTOR));
  }

  getVectorFormats(): Observable<VectorFormat[]> {
    return of(VECTOR_FORMATS);
  }
}
