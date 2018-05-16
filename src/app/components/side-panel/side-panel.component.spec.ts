import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapService } from '../../services/map.service';
import { SidePanelComponent } from './side-panel.component';
import { LayoutService } from '../../services/layout.service';

describe('SidePanelComponent', () => {
  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  @Component({selector: 'app-layers-panel', template: ''})
  class LayersPanelStubComponent {}

  let component: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;
  const mapService = new MapService(undefined, undefined);
  const layoutService = jasmine.createSpyObj('LayoutService', ['hideSidePanel']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidePanelComponent,
        SearchPanelStubComponent,
        LayersPanelStubComponent
      ],
      providers: [
        { provide: MapService, useValue: mapService },
        { provide: LayoutService, useValue: layoutService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate layers tab on start', () => {
    const layersTab = fixture.nativeElement.querySelector('a[href="#layers"]');
    expect(layersTab.classList.contains('active')).toBeTruthy();
    const layersTabContent = fixture.nativeElement.querySelector('#layers');
    expect(layersTabContent.classList.contains('show')).toBeTruthy();
    expect(layersTabContent.classList.contains('active')).toBeTruthy();
  });

  it('should activate search tab when map service search result is updated', () => {
    mapService.searchResult.next([]);
    const searchTab = fixture.nativeElement.querySelector('a[href="#search"]');
    expect(searchTab.classList.contains('active')).toBeTruthy();
    const searchTabContent = fixture.nativeElement.querySelector('#search');
    expect(searchTabContent.classList.contains('show')).toBeTruthy();
    expect(searchTabContent.classList.contains('active')).toBeTruthy();
  });

  it('#hideSidePanel should call spy layout service hideSidePanel', () => {
    component.hideSidePanel();
    expect(layoutService.hideSidePanel).toHaveBeenCalledTimes(1);
  });
});
