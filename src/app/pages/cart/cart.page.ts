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
    this.cartService.removeFromCart(product); // funcion para eliminar un produtno del carrito y mostrar el mensaje
    this.presentToast("Product Removed")
  }

  checkout() {
    this.cartService.clearCart();
    this.presentToast('Payment successful');    // esta funcion limpia al carrito , y muestra que el producto ya fue pagado
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({              // este muestra  los detalles del producto agregados por defecto
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}