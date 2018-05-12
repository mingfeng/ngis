import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { SearchItem } from '../shared/search-item';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  searchItems: SearchItem[] = [];

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.searchResult.subscribe({
      next: searchItems => this.searchItems = searchItems
    });
  }

  search(text: string) {
    this.mapService.searchByText(text);
  }

  select(searchItem: SearchItem) {
    this.mapService.selectSearchItem(searchItem);
  }
}
