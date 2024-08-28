import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(product: any) {
    this.cartService.removeFromCart(product);
    this.presentToast('Product removed from cart');
  }

  checkout() {
    this.cartService.clearCart();
    this.presentToast('Payment successful');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}