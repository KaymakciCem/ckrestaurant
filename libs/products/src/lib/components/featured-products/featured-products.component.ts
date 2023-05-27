import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'product-featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  
  featuredProducts: Product[] = [];
  endSubs$: Subject<void> = new Subject<void>();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getFeaturedProducts(4)
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: (products: Product[]) => {
        this.featuredProducts = products;
      },
      error: (err: any) => { console.log('err', err); },
   });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
