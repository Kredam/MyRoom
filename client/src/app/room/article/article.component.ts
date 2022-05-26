import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, Routes } from '@angular/router';
import { IArticles } from 'src/app/model/articles';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass', '../room.component.sass']
})
export class ArticleComponent implements OnInit {

  article: IArticles | undefined

  constructor(private articleService: ArticleService, private url : ActivatedRoute ) { }

  ngOnInit(): void {
    let url_param = this.url.snapshot.params['article']
    console.log(url_param)
    this.articleService.getArticle(url_param).subscribe(console.log)
  }

}
