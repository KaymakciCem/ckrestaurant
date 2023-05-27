import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'product-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(private productService: ProductsService,
    private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map((category) => category.id);

      this._getProducts(selectedCategories);
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProducts(categoriesFilter?: string[] | undefined): void {
    this.productService.getProducts(categoriesFilter)
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (error) => {
              console.log(error);
            }
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: (catergories: Category[]) => {
        this.categories = catergories;
      },
      error: (error) => {
              console.log(error);
            }
    });
  }

}
