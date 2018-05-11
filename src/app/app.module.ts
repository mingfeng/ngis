import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapService } from './services/map.service';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { LayersPanelComponent } from './layers-panel/layers-panel.component';
import { LayerService } from './services/layer.service';
import { MapConfigService } from './services/map-config.service';
import { MapToolbarComponent } from './map-toolbar/map-toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    MainComponent,
    SearchPanelComponent,
    SidePanelComponent,
    LayersPanelComponent,
    MapToolbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MapService, LayerService, MapConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
