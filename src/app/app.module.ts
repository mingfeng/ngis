import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';
import { MapService } from './map.service';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { SidePanelComponent } from './side-panel/side-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    MainComponent,
    SearchPanelComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
