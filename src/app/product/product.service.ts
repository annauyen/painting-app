import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private products: Product[] = [];
  private apiUrl = environment.apiUrl + '/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // getProduct(): Observable<Product>{
  //   return this.http.get<Product>(this.apiUrl + '/products')
  // }
}
