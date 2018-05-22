import { LayerType } from './enums';

export interface Country {
  id: string;
  name: string;
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

export interface MapConfig {
  defaultBasemap: string;
  defaultOverlays: string[];
  center: [number, number];
  zoom: number;
}

export interface SearchItem {
  id: string | number;
  name: string;
}

