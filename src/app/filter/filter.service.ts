import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyCountry } from './my-country';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  getNumbers():Observable<number>{
    return of(1,2,3,4);
  }
  getStdNames(): Observable<string> {
    return of("Mahesh, Krishna, Ram");
  }	
  getCountry(){
    return of(new MyCountry());
  }
}
