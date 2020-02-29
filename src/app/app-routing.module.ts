import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleMapComponent } from './simple-map/simple-map.component';
import { MapDirectionPanelComponent } from './map-direction-panel/map-direction-panel.component';

const routes: Routes = [
  {
    path: '', component: SimpleMapComponent
  },
  {
    path: 'ComplexMap', component: MapDirectionPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
