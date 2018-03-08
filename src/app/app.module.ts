import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapService } from './map.service';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
