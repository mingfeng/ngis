import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { LayersPanelComponent } from './components/layers-panel/layers-panel.component';
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { MapService } from './services/map.service';
import { LayerService } from './services/layer.service';
import { MapConfigService } from './services/map-config.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    MainComponent,
    SearchPanelComponent,
    SidePanelComponent,
    LayersPanelComponent,
    MapToolbarComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [MapService, LayerService, MapConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
