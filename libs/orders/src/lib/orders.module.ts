import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { Routes } from '@angular/router';

import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@bluebits/users';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent,
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}