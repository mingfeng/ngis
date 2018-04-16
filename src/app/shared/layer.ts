export enum LayerType {
  OSM,
  TILE
}

export interface Layer {
  type: LayerType;
  identifier: string;
  name: string;
  url: string;
  attributions?: string[];
  isBasemap: boolean;
}
