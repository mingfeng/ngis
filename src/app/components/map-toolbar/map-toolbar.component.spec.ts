import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapToolbarComponent } from './map-toolbar.component';
import { MapService } from '../services/map.service';

describe('MapToolbarComponent', () => {
  let component: MapToolbarComponent;
  let fixture: ComponentFixture<MapToolbarComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(async(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', [
      'resetInteraction',
      'activateDraw',
      'activateModify',
      'activateDragBox',
      'exportAsPNG'
    ]);

    TestBed.configureTestingModule({
      declarations: [ MapToolbarComponent ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#reset should call spy map service resetInteraction', () => {
    component.currentInteraction = 'draw';
    component.reset();
    expect(component.currentInteraction).toBe('');

    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.resetInteraction).toHaveBeenCalled();
  });

  it('#draw should call spy map service activateDraw', () => {
    component.draw();
    expect(component.currentInteraction).toBe('draw');

    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button[title="Draw"]');
    expect(button.getAttribute('class')).toContain('active');

    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.activateDraw).toHaveBeenCalled();
  });

  it('#modify should call spy map service activateModify', () => {
    component.modify();
    expect(component.currentInteraction).toBe('modify');

    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button[title="Modify"]');
    expect(button.getAttribute('class')).toContain('active');

    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.activateModify).toHaveBeenCalled();
  });

  it('#boxSearch should call spy map service activateDragBox', () => {
    component.boxSearch();
    expect(component.currentInteraction).toBe('box-search');

    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button[title="Box search"]');
    expect(button.getAttribute('class')).toContain('active');

    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.activateDragBox).toHaveBeenCalled();
  });

  it('#exportAsPNG should call spy map service exportAsPNG', () => {
    component.exportAsPNG();
    mapServiceSpy = TestBed.get(MapService);
    expect(mapServiceSpy.exportAsPNG).toHaveBeenCalled();
  });
});
