import { Component } from '@angular/core';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  activeTab = 'layers';

  constructor(private layoutService: LayoutService) { }

  hideSidePanel() {
    this.layoutService.hideSidePanel();
  }
}
