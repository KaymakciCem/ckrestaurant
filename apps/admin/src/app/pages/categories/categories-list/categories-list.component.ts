import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ckrestaurant/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubscription$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
      this.categoriesService.deleteCategory(categoryId)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        next: () =>  {
          this.messageService.add({severity: 'success', summary: 'Category deleted'});
          this.getCategories();
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Error deleting category'});
        }
      });
  }

  confirmYes() {
    console.log('Yes');
  }

  notConfirmed() {
    console.log('Not confirmed');
  }

  private getCategories(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubscription$))
    .subscribe(
      response => {
        this.categories = response;
      });
  }
}
