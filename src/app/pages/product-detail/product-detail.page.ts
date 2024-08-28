import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private cartService: CartService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(parseInt(id, 10));
    }
  }

  loadProduct(id: number) {
    this.httpService.getProductById(id).subscribe(
      (data: any[]) => {
        this.product = data;
      },
      (error: any[]) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.presentToast('Product added to cart');
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