import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  //Component Property 
  allArticles:Article[]=[];
  statusCode:any;


  constructor(private articleservices:ArticleService){

  }
  ngOnInit(): void {
    this.getAllArticles();
    }
    
    //Fetch All articles

    getAllArticles(){
      this.articleservices.getAllArticles().subscribe(
        data=>this.allArticles=data,
        errorcode=>this.statusCode=errorcode);
    }
}
