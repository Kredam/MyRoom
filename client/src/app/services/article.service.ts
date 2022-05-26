import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticles } from '../model/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = "http://127.0.0.1:8000/api/article/"

  constructor(private http: HttpClient) { }

  getArticle(id: string): Observable<IArticles>{
    return this.http.get<IArticles>(this.url + id)
  }
  
}
