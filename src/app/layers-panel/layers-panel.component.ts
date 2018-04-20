import { Component, OnInit } from '@angular/core';

import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { Layer } from '../shared/layer';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss']
})
export class LayersPanelComponent implements OnInit {
  basemapLayers: Layer[] = [];
  overlayLayers: Layer[] = [];
  currentBasemap = '';
  currentOverlays: Set<string> = new Set();

  constructor(private mapService: MapService, private layerService: LayerService) { }

  ngOnInit() {
    this.getLayers();
  }

  private getLayers() {
    this.layerService.getLayers().subscribe((layers) => {
      layers.forEach((layer) => {
        if (layer.isBasemap) {
          this.basemapLayers.push(layer);
        } else {
          this.overlayLayers.push(layer);
        }
      });
      this.currentBasemap = this.basemapLayers[0].identifier;  // must have at least one basemap
    });
  }

  changeBasemap(identifier: string) {
    this.currentBasemap = identifier;
    this.mapService.setBasemap(identifier);
  }

  toggleOverlay(identifier: string) {
    const isVisible = this.currentOverlays.has(identifier);
    if (isVisible) {
      this.currentOverlays.delete(identifier);
    } else {
      this.currentOverlays.add(identifier);
    }
    this.mapService.setOverlayVisibility(identifier, !isVisible);
  }
}
