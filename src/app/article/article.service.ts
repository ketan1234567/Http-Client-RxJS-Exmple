import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../article';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    //Url For Curd Operation
 articleUrl="/api/articles"
 handleError:any
  constructor(private http:HttpClient) { }


  //Fetch All  Articles


  getAllArticles():Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl).pipe(
      tap(articles=>console.log("Number of Article:"+articles.length)),
      catchError(this.handleError)
    );
  }



  //Create Articles
  createArticle(article:Article):Observable<number>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post<Article>(this.articleUrl+"/"+article.id,article,{
      headers:httpHeaders,
      observe:'response'
    }

    ).pipe(
      
      map(res=>res.status),
      catchError(this.handleError)  
    );
    
    }
   //Fetch Article By Id

    getArticleById(articleId:string):Observable<Article[]>{
      return this.http.get<Article>(this.articleUrl+"/"+articleId).pipe(
        tap(article=>console.log(article.title+""+article.category)),
        catchError(this.handleError)
      )
    }


    //update article by id

    updateArticle(article:Article):Observable<number>{
      let httpHeaders= new HttpHeaders({
        'Content-type':'application/json'
      });
      return this.http.put<Article>(this.articleUrl+"/"+ article.id,article,{
         headers:httpHeaders,
         observe:'response'

      }
      
      ).pipe(

        map(res=>res.status),
        catchError(this.handleError)
      );
    }

     // delete article by id
  deleteArticleById(articleId:string):Observable<number>{
    return this.http.delete<number>(this.articleUrl+"/"+articleId).pipe(
      tap(status=>console.log("status"+status)),
      catchError(this.handleError)
    );
  }

}
