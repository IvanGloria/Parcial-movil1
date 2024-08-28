import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private httpService: HttpService) {
    console.log('HomePage constructor called');
  }

  ngOnInit() {
    console.log('HomePage ngOnInit called');
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    console.log('Loading products...');
    this.httpService.getAllProducts().subscribe(
      (data) => {
        console.log('Products loaded:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadCategories() {
    console.log('Loading categories...');
    this.httpService.getCategories().subscribe(
      (data) => {
        console.log('Categories loaded:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onCategoryChange() {
    console.log('Category changed to:', this.selectedCategory);
    if (this.selectedCategory) {
      this.httpService.getProductsByCategory(this.selectedCategory).subscribe(
        (data) => {
          console.log('Products for category loaded:', data);
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products by category', error);
        }
      );
    } else {
      this.loadProducts();
    }
  }
}