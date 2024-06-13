import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../cart/cart.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    CurrencyPipe,
    MatGridListModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBarModule
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe();
  }

  filteredProducts: Product[] = [];
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    this.sortProduct(this.sortOrder);
  }

  sortOrder: string = '';
  sortProduct(sortValue: string): void {
    this.sortOrder = sortValue;

    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
