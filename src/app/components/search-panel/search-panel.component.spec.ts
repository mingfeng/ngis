import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelComponent } from './search-panel.component';
import { MapService } from '../../services/map.service';
import { SearchItem } from '../../shared/search-item';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;
  let mapService: MapService;
  let searchByTextSpy: jasmine.Spy;
  let selectSearchItemSpy: jasmine.Spy;

  beforeEach(async(() => {
    mapService = new MapService(undefined, undefined);
    searchByTextSpy = spyOn(mapService, 'searchByText');
    selectSearchItemSpy = spyOn(mapService, 'selectSearchItem');

    TestBed.configureTestingModule({
      declarations: [ SearchPanelComponent ],
      providers: [
        { provide: MapService, useValue: mapService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty searchItem list on start', () => {
    expect(component.searchItems).toEqual([]);
  });

  it('#searchItems should be updated if map service searh result get next value', () => {
    const searchItem = { id: 'ABC', name: 'ABC name' };
    mapService.searchResult.next([searchItem]);
    expect(component.searchItems).toEqual([searchItem]);
  });

  it('#search should call map service spy method searchByText', () => {
    component.search('text');
    expect(searchByTextSpy).toHaveBeenCalledWith('text');
  });

  it('#select should call map service spy method selectSearchItem', () => {
    const searchItem = { id: 'ABC', name: 'ABC name' };
    component.select(searchItem);
    expect(selectSearchItemSpy).toHaveBeenCalledWith(searchItem);
  });
});
