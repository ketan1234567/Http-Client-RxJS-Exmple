import { Component, OnInit } from '@angular/core';
import { filter, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.css']
})
export class TapComponent implements OnInit {
  ngOnInit() {
    of(2,4,6,8,10,"ketan").pipe(
      tap(e1=>console.log("Process",e1),
          err=>console.log(err),
          ()=>console.log("This is process complete"),
      ),

      filter(
        n =>n=== "ketan" ),
    
       
      

    ).subscribe(e1=>console.log("Even number is",e1))


    let cities=["varanasi","ketan","vishal"]

    of(cities).pipe(
      tap(c=>console.log(c.length)),
      map(dataArray=>dataArray.join(","))
    ).subscribe(res=>console.log(res))
    
  }



}
