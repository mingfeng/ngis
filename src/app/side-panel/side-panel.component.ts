import { Component, OnInit } from '@angular/core';

import { MapService } from '../services/map.service';
import { LayoutService } from '../services/layout.service';

declare var $: any;

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  activeTab = 'layers';

  constructor(private mapService: MapService, private layoutService: LayoutService) { }

  ngOnInit() {
    this.mapService.searchResult.subscribe({
      next: () => $('#side-panel-tab a[href="#search"]').tab('show')
    });
  }

  hideSidePanel() {
    this.layoutService.hideSidePanel();
  }
}
