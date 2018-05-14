import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import { LayoutService } from '../services/layout.service';
import { isEmbeddedView } from '@angular/core/src/view/util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  isSidePanelVisible = false;
  isDetailPanelVisible = false;

  private layoutMutationObserver: MutationObserver;

  constructor(
    private mapService: MapService,
    private layoutService: LayoutService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.layoutService.sidePanelVisibility.subscribe({
      next: isVisible => this.isSidePanelVisible = isVisible
    });
    this.layoutService.detailPanelVisibility.subscribe({
      next: isVisible => this.isDetailPanelVisible = isVisible
    });
  }

  ngAfterViewInit() {
    this.layoutMutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          this.mapService.updateMapSize();
        }
      });
    });

    const config = { attributes: true, childList: true, characterData: true };
    const sidePanelColumn = this.elementRef.nativeElement.querySelector('#side-panel-col');
    this.layoutMutationObserver.observe(sidePanelColumn, config);
    const detailpanelColumn = this.elementRef.nativeElement.querySelector('#detail-panel-col');
    this.layoutMutationObserver.observe(detailpanelColumn, config);
  }
}
