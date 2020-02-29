import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDirectionPanelComponent } from './map-direction-panel/map-direction-panel.component';
import { SimpleMapComponent } from './simple-map/simple-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapDirectionPanelComponent,
    SimpleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
