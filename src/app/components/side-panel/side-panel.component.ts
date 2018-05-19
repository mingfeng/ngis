import { Component, AfterViewInit } from '@angular/core';

import { LayoutService } from '../../services/layout.service';
import { SidePanelTab } from '../../shared/side-panel-tabs';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements AfterViewInit {
  activeTab = SidePanelTab.LAYERS;

  constructor(private layoutService: LayoutService) { }

  ngAfterViewInit() {
    this.layoutService.sidePanelActiveTab.subscribe({
      next: activeTab => this.activeTab = activeTab
    });
  }

  hideSidePanel() {
    this.layoutService.hideSidePanel();
  }
}
