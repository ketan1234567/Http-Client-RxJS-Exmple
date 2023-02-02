import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { FilterComponent } from './filter/filter.component';
import { TapComponent } from './tap/tap.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path:"article",
    component:ArticleComponent
  },
  {
    path:"merge-map",
    component:MergeMapComponent

  },
  {
    path:"filter",
    component:FilterComponent
  },
  {
    path:"tap",
    component:TapComponent  
  
  },
  {
    path:"map",
    component:MapComponent  
  
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
