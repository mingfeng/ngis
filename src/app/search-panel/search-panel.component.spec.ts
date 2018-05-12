import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelComponent } from './search-panel.component';
import { MapService } from '../services/map.service';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', [
      'searchByText',
      'selectSearchItem',
    ]);

    TestBed.configureTestingModule({
      declarations: [ SearchPanelComponent ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search should call map service spy method searchByText', () => {
    component.search('text');
    expect(mapServiceSpy.searchByText).toHaveBeenCalledWith('text');
  });

  it('#select should call map service spy method selectSearchItem', () => {
    const searchItem = { id: 'ABC', name: 'ABC name' };
    component.select(searchItem);
    expect(mapServiceSpy.selectSearchItem).toHaveBeenCalledWith(searchItem);
  });
});
