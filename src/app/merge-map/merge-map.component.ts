import { Component, OnInit } from '@angular/core';
import { merge, of } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators'; 

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {

  displaydata:any;
  ngOnInit(): void {
   

    of('x','y','z').pipe(
      mergeMap(e1=>of(1,2).pipe(
        delay(2000),
        map(num => e1 + num)
      )
    )
    ).subscribe(res=>
    console.log(this.displaydata=res))
      }

}
