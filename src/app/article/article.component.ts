import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']

})
export class ArticleComponent implements OnInit {

  //Component Property 
  allArticles: Article[] = [];
  statusCode: any;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;


  	//Create form
	articleForm = new FormGroup({
		title: new FormControl('', Validators.required),
		category: new FormControl('', Validators.required)
	});

  //create constructor to get services instance

  constructor(private articleservices: ArticleService) {

  }
  //crete ngonInit and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }


  //Fetch All articles

  getAllArticles() {
    this.articleservices.getAllArticles().subscribe(
      data => this.allArticles = data,
      errorcode => this.statusCode = errorcode);
  }


  //Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.valid) {
      return; //validation failed ,exit form method
    }
    //Form is valid new perform  create or Update 
    this.preProcessConfiguration();
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      //generate article id to create article
      this.articleservices.getAllArticles().subscribe(articles => {


        //generate article id (logic for demo)

        let maxIndex = article.length - 1;
        let articleWithMaxIndex = article[maxIndex];
        let articleId = articleWithMaxIndex.id + 1;
        article.id = articleId;


        //Create article

        this.articleservices.createArticle(article).subscribe(statusCode => {
          //Expecting success code  201 From serve 
          this.statusCode = this.statusCode;
          this.getAllArticles();
          this.backToCreateArticle();

        },
          errorCode => this.statusCode = errorCode

        );

      });


    } else {

      //Handle the update article 
      article.id = this.articleIdToUpdate;
      this.articleservices.updateArticle(article).subscribe(statusCode => {
        // this.statuscode=statuscode
        //expecting success code 204 from server
        this.statusCode = 200;
        this.getAllArticles();
        this.backToCreateArticle();
      },
        errorCode => this.statusCode = errorCode);

    }

  }
  //load article to edit 
  loadArticleToEdit(articleId: string) {
    this.preProcessConfiguration();
    this.articleservices.getArticleById(articleId).subscribe(
      article => {
     //   this.articleIdToUpdate = article.id;
       // this.articleForm.setValue({ title: article.title, category: article.category });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);


  }
  //delete article
  deleteArticle(articleId: string) {
    this.preProcessConfiguration();
    this.articleservices.deleteArticleById(articleId).subscribe(statusCode => {
      this.statusCode = 204;
      this.getAllArticles();
      this.backToCreateArticle();
    },
      errorCode => this.statusCode = errorCode);

  }
  //Perform preliminary process Configuration
  preProcessConfiguration() {
    this.statusCode = null;
    this.requestProcessing = true;

  }
  //go back to update  to create 

  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;



  }



}
