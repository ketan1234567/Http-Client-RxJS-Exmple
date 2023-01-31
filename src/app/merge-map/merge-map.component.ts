import { Component, OnInit } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators'; 
import { BookServicesService } from './book-services.service';
import { Book } from './book';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {

  allBooks$:Observable<Book[]> | undefined; 
  book:any=Book;
  constructor(private service:BookServicesService){}
  ngOnInit() {
    this.searchBook();
    this.getAllBooks();

    of('x','y','z').pipe(
      mergeMap(e1=>of(1,2).pipe(
        delay(2000),
        map(num=>e1+num)
      )),
      

    ).subscribe(res=>console.log(res))
   


}
id=102;
addMoreBooks(){
  let book1 = new Book(++this.id, "Book-"+ this.id);
  let book2 = new Book(++this.id, "Book-"+ this.id);
  let book3 = new Book(++this.id, "Book-"+ this.id);
  of(book1, book2, book3).pipe(
     mergeMap(book => {
       delay(2000);
       return this.service.addbook(book);
     }),
     catchError(err => {
       console.error(err.message);
       return of(new Book(100, "Default Book"));
     })
  ).subscribe(book=>{
     console.log(book.id+":"+book.name);
     this.getAllBooks();
   });

}

bookId =new FormControl();
searchBook(){

  this.bookId.valueChanges.pipe(
    switchMap(id => {
      delay(2000);
      console.log(id)
      if (id > this.id || id < 101) {
        return of(null);
      }
      console.log(this.id);
      return this.service.getBookById(id);
    })
  ).subscribe(res => this.book = res);
 }
 getAllBooks() {
    this.allBooks$ = this.service.getAllBooks();
 }
}
