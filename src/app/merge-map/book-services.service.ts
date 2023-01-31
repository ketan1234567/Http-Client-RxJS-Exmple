import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

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
  

}
