import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  mapId = 'map';

  constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.initMap(this.mapId);
  }

}
