import { Component, OnInit } from '@angular/core';
import { Observable, catchError, filter, map, of, pipe, retry, scan } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit{
  displaydata$:Observable<string[]>
  countryNames$:Observable<string>
  countryStates: string[];
  calculation$:any;

  constructor(private services:MapService){}
  ngOnInit() {
    this.getallstudyNames();
    //this.calcdata();
    this.getallstudyNames();
   // this.getCountryStates();
    this.calculatenumber2();
  }
  getallstudyNames(){
    this.displaydata$=this.services.getStudyNames().pipe(
      map(res=>res.split(",")),

    
      )
      
  }
  /*calcdata(){
    this.services.getnumber().pipe(
      filter(n=>n%2===1),
    ).subscribe( res=>console.log( res))
   
  }*/
  //using map with cathch Error 
  /*getCountryName() {
    this.countryNames$ = this.services.getCountry().pipe(
      map(country => country.getCountryName()),
      catchError(err => {
        console.error(err);
        return of("");
      })
    );
   }*/
    //Using retry, map and catchError
    /*getCountryStates() {
      this.services.getCountry().pipe(
        retry(2),
        map(country => country.getCountryState()),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      ).subscribe(res=> this.countryStates= res); 
     }*/
     //using obserable with pipe filter map scan

     /*calculateNumber(){
      this.services.getnumber().pipe(
        filter(n=>n%2===1), // if you calculate any you can use filter before 
        map(n=>n+10), // map is addition before we can use +10 


      ).subscribe(res=>console.log(res))
     }*/
     ///using standalone pipe


      calculatenumber2() {
  //Create a function to accept Observable instance   
  const calculationFun = pipe(
      filter((n: number) => true),
      map((n: number) => n ),
      scan((sum, n) =>(sum=sum+n))
    );

  //Instantiate response Observable
  const calculation$ = calculationFun(this.services.getnumber());

  //Subscribe the Observable instance
  calculation$.subscribe(result => console.log("result",result));
 }

     }




