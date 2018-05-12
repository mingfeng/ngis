import { Component, OnInit } from '@angular/core';

import { MapService } from '../services/map.service';

declare var $: any;

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  activeTab = 'layers';

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.searchResult.subscribe({
      next: () => $('#side-panel-tab a[href="#search"]').tab('show')
    });
  }

}
