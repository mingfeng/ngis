import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as ol from 'openlayers';
import { Subject, forkJoin } from 'rxjs';
import { Layer, MapConfig, SearchItem } from '../shared/interfaces';
import { LayerService } from './layer.service';
import { MapConfigService } from './map-config.service';
import OlLayerFactory from './ollayer-factory';
import { VectorFormatType } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: ol.Map;
  private basemaps: {[identifier: string]: ol.layer.Base};
  private overlays: {[identifier: string]: ol.layer.Base};

  private select: ol.interaction.Select;
  private modify: ol.interaction.Modify;
  private draw: ol.interaction.Draw;
  private dragBox: ol.interaction.DragBox;

  searchResult: Subject<SearchItem[]> = new Subject<SearchItem[]>();

  constructor(private layerService: LayerService, private mapConfigService: MapConfigService) { }

  initialize(mapId: string) {
    forkJoin(
      this.layerService.getLayers(),
      this.mapConfigService.getMapConfig()
    ).subscribe(([layers, mapConfig]) => {
      this.setUpLayers(layers, mapConfig);
      this.setUpInteractions();
      this.setupMap(mapId, mapConfig);
    });
  }

  private setUpLayers(layers: Layer[], mapConfig: MapConfig) {
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

  private setUpInteractions() {
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

    this.dragBox = new ol.interaction.DragBox();
    this.dragBox.on('boxend', () => {
      const extent = this.dragBox.getGeometry().getExtent();
      this.searchByExtent(extent);
    });
    this.dragBox.setActive(false);
  }

  private setupMap(target: string, mapConfig: MapConfig) {
    this.map = new ol.Map({
      target,
      interactions: ol.interaction.defaults().extend([this.select, this.modify, this.draw, this.dragBox]),
      layers: Object.values(this.basemaps).concat(Object.values(this.overlays)),
      view: new ol.View({
        center: ol.proj.fromLonLat(mapConfig.center),
        zoom: mapConfig.zoom
      })
    });
  }

  private getDrawLayer() {
    // Currently we only use countries as the single data source, hence
    // all the operations are based on the countries layer.
    return <ol.layer.Vector>this.overlays['countries'];
  }

  updateMapSize() {
    this.map.updateSize();
  }

  setBasemap(identifier: string) {
    for (const [key, layer] of Object.entries(this.basemaps)) {
      layer.setVisible(key === identifier);
    }
  }

  setOverlayVisibility(identifier: string, isVisible: boolean) {
    const layer = this.overlays[identifier];
    layer.setVisible(isVisible);
  }

  resetInteraction() {
    this.select.getFeatures().clear();
    this.select.setActive(false);
    this.modify.setActive(false);
    this.draw.setActive(false);
    this.dragBox.setActive(false);
  }

  activateDraw() {
    this.select.setActive(false);
    this.modify.setActive(false);
    this.draw.setActive(true);
    this.dragBox.setActive(false);
  }

  activateModify() {
    this.select.setActive(true);
    this.modify.setActive(true);
    this.draw.setActive(false);
    this.dragBox.setActive(false);
  }

  activateDragBox() {
    this.select.setActive(false);
    this.modify.setActive(false);
    this.draw.setActive(false);
    this.dragBox.setActive(true);
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

  importVectorFeatures(importConfig) {
    const { layer, format, projection, contents } = importConfig;
    if (format === VectorFormatType.WKT) {
      this.addWKTFeature(contents, projection);
    } else if (format === VectorFormatType.GEOJSON) {
      this.addGeoJsonFeature(contents, projection);
    }
  }

  addWKTFeature(wkt: string, projection?: string) {
    const format = new ol.format.WKT();
    const feature = format.readFeature(wkt, {
      dataProjection: projection || this.map.getView().getProjection(),
      featureProjection: this.map.getView().getProjection()
    });
    const layer = this.getDrawLayer();
    layer.getSource().addFeature(feature);
  }

  addGeoJsonFeature(geojson: string, projection?: string) {
    const format = new ol.format.GeoJSON();
    const feature = format.readFeature(geojson, {
      dataProjection: projection || this.map.getView().getProjection(),
      featureProjection: this.map.getView().getProjection()
    });
    const layer = this.getDrawLayer();
    layer.getSource().addFeature(feature);
  }

  selectSearchItem(searchItem: SearchItem) {
    const layer = this.getDrawLayer();
    const feature = layer.getSource().getFeatureById(searchItem.id);
    this.map.getView().fit(feature.getGeometry().getExtent());
  }

  searchByText(text: string) {
    const layer = this.getDrawLayer();
    const features = layer.getSource().getFeatures().filter(feature => (<string>feature.get('name')).includes(text));
    const searchItems = features.map(feature => ({ id: feature.getId(), name: feature.get('name') }));
    this.searchResult.next(searchItems);
  }

  searchByExtent(extent: ol.Extent) {
    const layer = this.getDrawLayer();
    const searchItems = [];
    layer.getSource().forEachFeatureIntersectingExtent(extent, feature => {
      searchItems.push({ id: feature.getId(), name: feature.get('name') });
      return false;
    });
    this.searchResult.next(searchItems);
  }
}
