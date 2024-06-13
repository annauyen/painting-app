import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl + '/cart';
  constructor(private http: HttpClient) {}

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  private apiCheckoutUrl = environment.apiUrl + '/checkout';
  checkOut(checkOutProducts: Product[]): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiCheckoutUrl, checkOutProducts);
  }
}
