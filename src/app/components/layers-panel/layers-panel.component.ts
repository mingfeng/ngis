import { Component, OnInit } from '@angular/core';
import { LayerService } from '../../services/layer.service';
import { MapConfigService } from '../../services/map-config.service';
import { MapService } from '../../services/map.service';
import { Layer } from '../../shared/interfaces';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss']
})
export class LayersPanelComponent implements OnInit {
  basemapLayers: Layer[] = [];
  overlayLayers: Layer[] = [];
  currentBasemap: string;
  currentOverlays: Set<string>;

  constructor(
    private mapService: MapService,
    private layerService: LayerService,
    private mapConfigService: MapConfigService
  ) { }

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
      this.mapConfigService.getMapConfig().subscribe(mapConfig => {
        this.currentBasemap = mapConfig.defaultBasemap;
        this.currentOverlays = new Set(mapConfig.defaultOverlays);
      });
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
