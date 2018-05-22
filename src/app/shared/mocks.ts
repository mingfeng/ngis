import { LayerType } from './enums';
import { Layer, MapConfig } from './interfaces';

export const LAYERS: Layer[] = [{
  type: LayerType.TILE,
  identifier: 'osm',
  name: 'OpenStreetMap',
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  isBasemap: true
}, {
  type: LayerType.TILE,
  identifier: 'wkm',
  name: 'Wikimedia Maps',
  url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  isBasemap: true
}, {
  type: LayerType.VECTOR,
  identifier: 'countries',
  name: 'Countries',
  url: '/assets/countries.geojson',
  isBasemap: false
}];

export const MAP_CONFIG: MapConfig = {
  defaultBasemap: 'osm',
  defaultOverlays: ['countries'],
  center: [24.9384, 60.1699],
  zoom: 12
};
