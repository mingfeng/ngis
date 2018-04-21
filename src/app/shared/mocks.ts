import { Layer, LayerType } from './layer';
import { MapConfig } from './map-config';

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
  type: LayerType.WMS,
  identifier: 'countries',
  name: 'Countries',
  url: 'http://disc1.sci.gsfc.nasa.gov/daac-bin/wms_airsnrt?layer=AIRS_SO2_A&',
  params: {'LAYERS': 'countries'},
  projection: 'EPSG:4326',
  isBasemap: false
}];

export const MAP_CONFIG: MapConfig = {
  defaultBasemap: 'osm',
  defaultOverlays: ['countries'],
  center: [24.9384, 60.1699],
  zoom: 12
};
