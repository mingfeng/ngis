import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapService } from '../services/map.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const mapServiceSpy = jasmine.createSpyObj('MapService', ['initialize']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component mapId as map div id', () => {
    fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    const mapElement: HTMLElement = fixture.nativeElement;
    const mapDiv = mapElement.querySelector('.map');
    expect(mapDiv.getAttribute('id')).toEqual(component.mapId);
  });

  it('should call map service initialize after call ngAfterViewInit', () => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.ngAfterViewInit();
    expect(mapServiceSpy.initialize.calls.any()).toBe(true, 'initialize called');
  });
});
