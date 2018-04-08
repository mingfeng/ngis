import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelComponent } from './side-panel.component';

describe('SidePanelComponent', () => {
  let component: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;

  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  @Component({selector: 'app-layers-panel', template: ''})
  class LayersPanelStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidePanelComponent,
        SearchPanelStubComponent,
        LayersPanelStubComponent
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
});
