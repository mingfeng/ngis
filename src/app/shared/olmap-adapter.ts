import * as ol from 'openlayers';
import { saveAs } from 'file-saver';

import { Layer, LayerType } from './layer';
import { MapConfig } from './map-config';
import OlLayerFactory from './ollayer-factory';
import { Extent } from './extent';
import { SearchItem } from './search-item';

export class OlMapAdapter {
  private map: ol.Map;
  private basemaps: {[identifier: string]: ol.layer.Base};
  private overlays: {[identifier: string]: ol.layer.Base};

  private select: ol.interaction.Select;
  private modify: ol.interaction.Modify;
  private draw: ol.interaction.Draw;

  constructor(target: string, layers: Layer[], mapConfig: MapConfig) {
    this.setUpLayers(layers, mapConfig);
    this.setUpInteractions();
    this.setupMap(target, mapConfig);
  }

  setUpLayers(layers: Layer[], mapConfig: MapConfig) {
    this.basemaps = layers.filter(layer => layer.isBasemap).reduce((basemaps, layer) => {
      basemaps[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return basemaps;
    }, {});
    this.overlays = layers.filter(layer => !layer.isBasemap).reduce((overlays, layer) => {
      overlays[layer.identifier] = OlLayerFactory.getOlLayer(layer);
      return overlays;
    }, {});

    this.basemaps[mapConfig.defaultBasemap].setVisible(true);
    mapConfig.defaultOverlays.forEach(identifier => this.overlays[identifier].setVisible(true));
  }

  setUpInteractions() {
    this.select = new ol.interaction.Select();
    this.select.setActive(false);

    this.modify = new ol.interaction.Modify({
      features: this.select.getFeatures()
    });
    this.modify.setActive(false);

    const drawLayer = this.getDrawLayer();
    this.draw = new ol.interaction.Draw({
      source: drawLayer.getSource(),
      type: 'Polygon'
    });
    this.draw.setActive(false);
  }

  getDrawLayer() {
    // TODO: for now we just assume assume the country layer is drawable
    return <ol.layer.Vector>this.overlays['countries'];
  }

  setupMap(target: string, mapConfig: MapConfig) {
    this.map = new ol.Map({
      target,
      interactions: ol.interaction.defaults().extend([this.select, this.modify, this.draw]),
      layers: Object.values(this.basemaps).concat(Object.values(this.overlays)),
      view: new ol.View({
        center: ol.proj.fromLonLat(mapConfig.center),
        zoom: mapConfig.zoom
      })
    });
  }

  updateMapSize() {
    this.map.updateSize();
  }

  setBasemap(identifier) {
    for (const [key, layer] of Object.entries(this.basemaps)) {
      layer.setVisible(key === identifier);
    }
  }

  setOverlayVisibility(identifier, isVisible) {
    const layer = this.overlays[identifier];
    layer.setVisible(isVisible);
  }

  resetInteraction() {
    this.select.getFeatures().clear();
    this.select.setActive(false);
    this.modify.setActive(false);
    this.draw.setActive(false);
  }

  activateDraw() {
    this.select.setActive(false);
    this.modify.setActive(false);
    this.draw.setActive(true);
  }

  activateModify() {
    this.select.setActive(true);
    this.modify.setActive(true);
    this.draw.setActive(false);
  }

  exportAsPNG() {
    this.map.once('postcompose', (event: ol.render.Event) => {
      const canvas = event.context.canvas;
      canvas.toBlob((blob) => {
        saveAs(blob, 'map.png');
      });
    });
    this.map.renderSync();
  }

  selectSearchItem(searchItem: SearchItem) {
    const layer = this.getDrawLayer();
    const feature = layer.getSource().getFeatureById(searchItem.id);
    this.map.getView().fit(feature.getGeometry().getExtent());
  }

  searchByText(text: string): SearchItem[] {
    const layer = this.getDrawLayer();
    const features = layer.getSource().getFeatures().filter(feature => (<string>feature.get('name')).includes(text));
    return features.map(feature => ({ id: feature.getId(), name: feature.get('name') }));
  }

  searchByExtent(extent: Extent) {
    const layer = this.getDrawLayer();
    const features = layer.getSource().getFeaturesInExtent(extent);
    return features.map(feature => ({ id: feature.getId(), name: feature.get('name') }));
  }
}
