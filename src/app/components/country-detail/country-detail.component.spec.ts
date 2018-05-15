import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailComponent } from './country-detail.component';
import { LayoutService } from '../../services/layout.service';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  const layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['hideDetailPanel']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDetailComponent ],
      providers: [
        { provide: LayoutService, useValue: layoutServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#hideDetailPanel should call spy layout service hideDetailPanel', () => {
    component.hideDetailPanel();
    expect(layoutServiceSpy.hideDetailPanel).toHaveBeenCalled();
  });
});
