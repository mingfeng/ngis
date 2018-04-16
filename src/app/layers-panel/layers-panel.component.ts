import { Component, OnInit } from '@angular/core';

import { LayerService } from '../services/layer.service';
import { Layer } from '../shared/layer';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss']
})
export class LayersPanelComponent implements OnInit {
  basemapLayers: Layer[] = [];
  overlayLayers: Layer[] = [];

  constructor(private layerService: LayerService) { }

  ngOnInit() {
    this.getLayers();
  }

  getLayers() {
    this.layerService.getLayers().subscribe((layers) => {
      layers.forEach((layer) => {
        if (layer.isBasemap) {
          this.basemapLayers.push(layer);
        } else {
          this.overlayLayers.push(layer);
        }
      });
    });
  }
}
