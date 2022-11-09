import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticles } from 'src/app/model/articles';
import { IComments } from 'src/app/model/comments';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './room-article.component.html',
  styleUrls: ['./room-article.component.sass', '../content/room-content.component.sass']
})
export class ArticleComponent implements OnInit {

  article: IArticles | undefined
  comments : IComments | undefined

  constructor(private articleService: ArticleService, private url : ActivatedRoute ) { }

  ngOnInit(): void {
    let url_param = this.url.snapshot.params['article']
    console.log(this.url.snapshot.params)
    this.articleService.getArticle(url_param).subscribe(console.log)
  }

}
