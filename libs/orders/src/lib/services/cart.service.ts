import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: [],
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  emptyCart() {
    const intialCart = {
      items: [],
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY) as string;
    const cart: Cart = JSON.parse(cartJsonString);
    console.log(cart);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    let cartItemExist!: CartItem;
    if (cart.items) {
      cartItemExist = cart.items.find(
        (item) => item.productId === cartItem.productId
      ) as CartItem;
    }

    if (cartItemExist) {
      cart.items
        ? cart.items.map((item) => {
            if (item.productId === cartItem.productId) {
              if (updateCartItem) {
                item.quantity = cartItem.quantity;
              } else {
                if (item.quantity && cartItem.quantity) {
                  item.quantity = item.quantity + cartItem.quantity;
                }
              }

              return item;
            }
            return item;
          })
        : null;
    } else {
      if (cart.items) {
        cart.items.push(cartItem);
      }
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    let newCart!: CartItem[];
    if (cart.items) {
      newCart = cart.items.filter(
        (item) => item.productId !== (productId as string)
      );
    }

    if (newCart) {
      cart.items = newCart;
    }

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }
}
