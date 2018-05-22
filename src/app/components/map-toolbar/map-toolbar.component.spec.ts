import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LayoutService } from '../../services/layout.service';
import { MapService } from '../../services/map.service';
import { MapToolbarComponent } from './map-toolbar.component';

describe('MapToolbarComponent', () => {
  let component: MapToolbarComponent;
  let fixture: ComponentFixture<MapToolbarComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;
  let layoutServiceSpy: jasmine.SpyObj<LayoutService>;

  beforeEach(async(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', [
      'resetInteraction',
      'activateDraw',
      'activateModify',
      'activateDragBox',
      'exportAsPNG'
    ]);

    layoutServiceSpy = jasmine.createSpyObj('LayoutService', [
      'showLayersPanel',
      'showSearchPanel'
    ]);

    TestBed.configureTestingModule({
      declarations: [ MapToolbarComponent ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy },
        { provide: LayoutService, useValue: layoutServiceSpy }
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

  it('#showLayersPanel should call spy layout service showLayersPanel', () => {
    component.showLayersPanel();
    expect(layoutServiceSpy.showLayersPanel).toHaveBeenCalled();
  });

  it('#showSearchPanel should call spy layout service showSearchPanel', () => {
    component.showSearchPanel();
    expect(layoutServiceSpy.showSearchPanel).toHaveBeenCalled();
  });

  it('#reset should call spy map service resetInteraction', () => {
    component.currentInteraction = 'draw';
    component.reset();
    expect(component.currentInteraction).toBe('');

    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button[title="Reset"]');
    expect(button.getAttribute('class')).toContain('active');

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
