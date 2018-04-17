import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersPanelComponent } from './layers-panel.component';
import { LayerService } from '../services/layer.service';

describe('LayersPanelComponent', () => {
  let component: LayersPanelComponent;
  let fixture: ComponentFixture<LayersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersPanelComponent ],
      providers: [LayerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
