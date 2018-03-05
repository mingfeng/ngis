import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapService } from './map.service';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
