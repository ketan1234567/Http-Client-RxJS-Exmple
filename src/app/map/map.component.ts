import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit{
  displaydata$:Observable<string[]>
  constructor(private services:MapService){}
  ngOnInit() {
    this.getallstudyNames();
  }
  getallstudyNames(){
    this.displaydata$=this.services.getStudyNames().pipe(
      map(res=>res.split(",")),
      )
  }

}
