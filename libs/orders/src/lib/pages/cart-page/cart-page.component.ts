import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemDetailed } from '../../models/cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<void> = new Subject();
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((respCart) => {
        this.cartItemsDetailed = [];
        if (respCart.items) {
          this.cartCount = respCart?.items.length ?? 0;
          respCart.items.forEach((cartItem) => {
            this.ordersService
              .getProduct(cartItem.productId as string)
              .subscribe((respProduct) => {
                this.cartItemsDetailed.push({
                  product: respProduct,
                  quantity: cartItem.quantity,
                });
              });
          });
        }
      });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity($event: any, cartItem: CartItemDetailed) {
    console.log($event);
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: $event.value,
      },
      true
    );
  }
}
