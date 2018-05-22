import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LayoutService } from '../../services/layout.service';
import { MapService } from '../../services/map.service';
import { SidePanelTab } from '../../shared/enums';
import { SidePanelComponent } from './side-panel.component';

describe('SidePanelComponent', () => {
  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  @Component({selector: 'app-layers-panel', template: ''})
  class LayersPanelStubComponent {}

  let component: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;
  let mapService: MapService;
  let layoutService: LayoutService;

  beforeEach(async(() => {
    mapService = new MapService(undefined, undefined);
    layoutService = new LayoutService(mapService);
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

  it('should update activeTab if layout service sidePanelActiveTab is changed', () => {
    layoutService.sidePanelActiveTab.next(SidePanelTab.SEARCH);
    expect(component.activeTab).toBe(SidePanelTab.SEARCH);
    layoutService.sidePanelActiveTab.next(SidePanelTab.LAYERS);
    expect(component.activeTab).toBe(SidePanelTab.LAYERS);
  });

  it('#hideSidePanel should call spy layout service hideSidePanel', () => {
    const hideSidePanelSpy = spyOn(layoutService, 'hideSidePanel');
    component.hideSidePanel();
    expect(hideSidePanelSpy).toHaveBeenCalled();
  });
});
