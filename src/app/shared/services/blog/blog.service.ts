import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { blogElementRequest, blogElementResponse } from '../../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { blogs: `${this.url}/blogs` };
  constructor(private http: HttpClient) { }

  // Отримуєм данні
  getAll(): Observable<blogElementResponse[]> {
    return this.http.get<blogElementResponse[]>(this.api.blogs);
  }

  // Створюємо пост
  create(blog: blogElementRequest): Observable<void> {
    return this.http.post<void>(this.api.blogs, blog)
  }

  // Видалення поста
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.blogs}/${id}`,)
  }

  // Оновлення посту
  update(blog: blogElementRequest, id: number): Observable<blogElementRequest> {
    return this.http.patch<blogElementRequest>(`${this.api.blogs}/${id}`, blog)
  }



  getOne(id: number): Observable<blogElementResponse> {
    return this.http.get<blogElementResponse>(`${this.api.blogs}/${id}`)
  }
}
