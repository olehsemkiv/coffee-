import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  constructor(private http: HttpClient) { }

  // Отримуєм данні
  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  // Створюємо пост
  create(product: IProductRequest): Observable<void> {
    return this.http.post<void>(this.api.products, product)
  }

  // Видалення поста
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`,)
  }

  // Оновлення посту
  update(product: IProductRequest, id: number): Observable<IProductRequest> {
    return this.http.patch<IProductRequest>(`${this.api.products}/${id}`, product)
  }

  getAllbyCategory(category: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category=${category}`)
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  }
}
