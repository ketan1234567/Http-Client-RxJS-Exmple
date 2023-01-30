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
  articleIdToUpdate:any;
  processValidation = false;
  
  savedata:any;


  	//Create form



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

  articleForm = new FormGroup({
    id:new FormControl(),
		title: new FormControl('', Validators.required),
		category: new FormControl('', Validators.required)
	});
  //Handle create and update article
  onArticleFormSubmit() {
    console.log("I am not article form submit");
    //Form is valid new perform  create or Update 
    this.preProcessConfiguration();
          this.articleservices.createArticle(this.articleForm.value).subscribe(statusCode => {
            //Expecting success code  201 From serve 
            this.statusCode = 201;
            this.getAllArticles();
            this.backToCreateArticle();
          },
            errorCode => this.statusCode = errorCode
          )

       
   
}
loadArticleToEdit(articleId: any) {

  this.preProcessConfiguration();
		this.articleservices.getArticleById(articleId)
			.subscribe(article => {
				this.articleIdToUpdate = article.id;
        console.log(this.articleIdToUpdate)
				this.articleForm.setValue({id:this.articleIdToUpdate,title: article.title, category: article.category });
        this.getAllArticles();

				this.processValidation = true;
				this.requestProcessing = false;
      
			},
				errorCode => this.statusCode = errorCode);
    }
    updateUser(){
      this.articleservices.updateArticle(this.articleForm.value).subscribe(item=>{
        this.savedata=item;
        this.statusCode = 200;
        this.getAllArticles();
      });
   
    }
	//Load article by id to edit


      //Update article


  //delete article
  deleteArticle(articleId: any) {
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

