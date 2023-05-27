import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  
  @Input() product: Product; 
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
