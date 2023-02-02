import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getStudyNames():Observable<string>{
    return of("vishal","ketan",);
  }
}
