import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '@ckrestaurant/orders';
import { CartItem } from 'libs/orders/src/lib/models/Cart';

@Component({
  selector: 'product-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  
  @Input() product: Product = {}; 
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.product);
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
  }

}
