export enum LayerType {
  OSM,
  TILE,
  WMS
}

export interface Layer {
  type: LayerType;
  identifier: string;
  name: string;
  url: string;
  params?: {[param: string]: string};
  projection?: string;
  attributions?: string[];
  isBasemap: boolean;
}
