// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
// import { ProductsService, Product } from '@ckrestaurant/products';

// @Component({
//   selector: 'admin-product-list',
//   templateUrl: './product-list.component.html'
// })
// export class ProductListComponent implements OnInit {
//   products = [];

//   constructor(
//     private productService: ProductsService,
//     private router: Router,
//     private messageService: MessageService) {}

//   ngOnInit() {
//     this.getProducts();
//   }

//   getProducts() {
//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   updateProduct(productId: string) {
//     this.router.navigateByUrl(`products/form/${productId}`);
//   }

//   deleteProduct(productId: string) {
//     this.productService.deleteProduct(productId).subscribe(
//       (product: Product) => {
//         this.messageService.add({severity: 'success', summary: 'Product deleted'});
//         this.getProducts();
//       }, (error) => { 
//         this.messageService.add({severity: 'error', summary: 'Error deleting product'});
//       }
//     );
//   }
  
// }
