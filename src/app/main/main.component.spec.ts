import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';

import { MainComponent } from './main.component';
import { MapService } from '../map.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  @Component({selector: 'app-map', template: ''})
  class MapStubComponent {}

  @Component({selector: 'app-side-panel', template: ''})
  class SidePanelStubComponent {}

  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  const mapServiceSpy = jasmine.createSpyObj('MapService', ['updateMapSize']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MapStubComponent,
        SidePanelStubComponent,
        SearchPanelStubComponent
      ],
      imports: [AngularSplitModule],
      providers: [
        { provide: MapService, useValue: mapServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MapService updateMapSize method', () => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.updateMapSize();
    expect(mapServiceSpy.updateMapSize.calls.count()).toBe(1);
  });
});
