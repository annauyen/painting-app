import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  index: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      console.log('deleted');
    });
  }

  checkOut(): void {
    this.cartService.checkOut(this.cartItems).subscribe();
  }
}
