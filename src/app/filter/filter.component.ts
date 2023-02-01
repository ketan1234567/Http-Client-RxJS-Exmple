import { Component, OnInit } from '@angular/core';
import { Observable, filter, map, observable,of} from 'rxjs';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  StdNames$:any
  countryNames$:any=Observable<string>;
  countrystates:[]=[];
  constructor(private services:FilterService){}
  ngOnInit(){
    let numarray=[1,2,3,4];
    this.getStdNames();
    //using javascript array filter
    numarray.filter(n=>{
   
      return n % 2===0;
  
    })
.forEach(e1 =>console.log("Even Number:"+e1));
  

// using rxjs filter 

of(numarray).pipe(
 filter(dataArray=>{
  console.log(dataArray);
  return dataArray.length>0;
 })
).subscribe(resArray=>console.log(resArray.join("|")))
}
//using rxjs Function with help of Map
getStdNames() {
  this.StdNames$ = this.services.getStdNames().pipe(
    filter(data => data.indexOf(",") > 0),
    map(res => res.split(","))
  );
 }
}



