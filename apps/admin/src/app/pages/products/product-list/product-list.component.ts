import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from '@ckrestaurant/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = [];
  endSubscription$ = new Subject<void>();

  constructor(
    private productService: ProductsService,
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  getProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId)
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Product deleted'});
        this.getProducts();
      },
      error: () => { 
        this.messageService.add({severity: 'error', summary: 'Error deleting product'});
      }
    });
  }
  
}
