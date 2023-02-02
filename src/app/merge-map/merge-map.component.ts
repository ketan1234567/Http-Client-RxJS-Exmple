import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, interval, merge, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap, retry, switchMap } from 'rxjs/operators'; 
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
  bookstore:any
  isreq=true;
  result=34;
  a:any;
  b:any
  anil:any
 
  constructor(private service:BookServicesService){}
  ngOnInit() {
    this.searchBook();
    this.getAllBooks();
    this.addblock();

    of("A", "B").pipe(
      switchMap(el => {
      if (el === "B") {
     // return throwError("Error occurred.");
      }
      return el;
      }),
      retry(1000),
      catchError(err => {
      console.error(err);
      return throwError("User defined error.");
      })
    ).subscribe(el => console.log(el),
      err => console.error(err),
      () => console.log("Processing Complete.")
    ); 

    /*of('x','y','z').pipe(
      mergeMap(e1=>of(1,2).pipe(
        delay(2000),
        map(num=>e1+num)
      )),
      

    ).subscribe(res=>console.log(res))

   /* of(1,2,3,4).pipe(
      mergeMap(data=>{
        if(data===3){
          return throwError("Error ocuured for data "+3)
        }
        return of(data);
        

      })
    ).subscribe(res=>(console.log(res)))
    */

    /*of(2,4,3).pipe(
      mergeMap(x=>x===3? throwError("Error Recevied"+3):of('a','b')),
      map(x=>x+"ll")
    ).subscribe(x=>console.log(x),
     e=>console.log(e)
    )*/

   
}
addblock(){
  console.log("ketan");
  return this.service.getbook(this.id).subscribe(res=>{
    this.bookstore=res


  })
}
id=1;
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
const sum = function (x, y) {
  return console.log(x + y);
}
sum(10,20)

let sum1 =a=>console.log(a)

sum1(200000);