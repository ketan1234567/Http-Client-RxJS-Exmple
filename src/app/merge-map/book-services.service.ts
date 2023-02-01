import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, catchError, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

  constructor(private http:HttpClient) { }

  bookUrl="http://localhost:3000/bookDetails";

  addbook(book:Book):Observable<Book>{
    return this.http.post<Book>(this.bookUrl,book);

  }
  removeBook(id:number):Observable<Book>{
    return this.http.delete<any>(this.bookUrl+"/"+id);

  }
  getBookById(id:any):Observable<any>{
    return this.http.get<Book>(this.bookUrl+"/"+id);

  }
  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.bookUrl);

  }
  getbook(data:any):Observable<any>{
    let url =this.bookUrl;
 
    return this.http.get<any>(url).pipe(
      tap(()=>console.log(url)),
      retry(3), // Retry the failed request up to 3 times
      catchError(err=>{
        console.log(err);
        return of(null);
      })
    )

  }

}
