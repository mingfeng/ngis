import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidePanelVisibility = new BehaviorSubject<boolean>(false);
  detailPanelVisibility = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isSidePanelVisible() {
    return this.sidePanelVisibility.getValue();
  }

  showSidePanel() {
    if (!this.isSidePanelVisible) {
      this.sidePanelVisibility.next(true);
    }
  }

  hideSidePanel() {
    if (this.isSidePanelVisible) {
      this.sidePanelVisibility.next(false);
    }
  }

  get isDetailPanelVisible() {
    return this.detailPanelVisibility.getValue();
  }

  showDetailPanel() {
    if (!this.isDetailPanelVisible) {
      this.detailPanelVisibility.next(true);
    }
  }

  hideDetailPanel() {
    if (this.isDetailPanelVisible) {
      this.detailPanelVisibility.next(false);
    }
  }
}
