import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item: any;
  @Output() remove = new EventEmitter<any>();

  removeItem() {
    this.remove.emit(this.item);
  }
}