import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../models/Cart";
import { BehaviorSubject } from "rxjs";

export const CART_KEY = "cart";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    
    cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        
        if(!cart) {
            const initialCart =  {
                items: []
            };
            
            localStorage.setItem('cart', JSON.stringify(initialCart));
        }
    }

    getCart(): Cart { 
        return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();
        const cartItemExists= cart.items!.find((item) => item.productId === cartItem.productId);
        if(cartItemExists) {
            cart.items!.map((item) => {
                if(item.productId === cartItem.productId) {
                    item.quantity = item.quantity! + cartItem.quantity!;
                }
            });
        } else {
            cart.items!.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart) || '{}');
        this.cart$.next(cart);
        return cart;
    }

}