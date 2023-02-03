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
    return of(100,2,3,4,5,6,7,8,9);
  }
  getCountry(){
    return of(new MyCountry());
  }

}
