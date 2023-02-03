import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyCountry } from '../my-country';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  getStudyNames():Observable<string>{
    return of("vishal","ketan","kk","ss","aa");
  }
  getnumber():Observable<number>{
    return of(10,10,10,10,10);
  }
  getCountry(){
    return of(new MyCountry());
  }

}
