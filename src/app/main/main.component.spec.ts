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

  @Component({selector: 'app-search-panel', template: ''})
  class SearchPanelStubComponent {}

  const mapServiceSpy = jasmine.createSpyObj('MapService', ['updateMapSize']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MapStubComponent,
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

  it('should render map component', () => {
    const mapElement: HTMLElement = fixture.nativeElement;
    expect(mapElement.querySelector('app-map')).not.toBeNull();
  });

  it('should render search panel component', () => {
    const mapElement: HTMLElement = fixture.nativeElement;
    expect(mapElement.querySelector('app-search-panel')).not.toBeNull();
  });

  it('should call MapService updateMapSize method', () => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.updateMapSize();
    expect(mapServiceSpy.updateMapSize.calls.count()).toBe(1);
  });
});
