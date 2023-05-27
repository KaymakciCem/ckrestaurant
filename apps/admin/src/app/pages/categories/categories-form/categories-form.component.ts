import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ckrestaurant/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  endSubscription$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.getCategoryForm().name.value,
      icon: this.getCategoryForm().icon.value
    };

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  getCategoryForm() { 
    return this.formGroup.controls;
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;



          this.categoryService.getCategory(params.id)
          .subscribe({
            next: (response) => {
              this.getCategoryForm().name.setValue(response.name);
              this.getCategoryForm().icon.setValue(response.icon);
            },
            error: (error) => { 
              this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
            } 
          });

      }
    })
  }

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category)
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} Updated`});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: (error) => { 
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
      }
    });
  }

  private _addCategory(category: Category) {
    this.categoryService.addCategories(category)
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} Added`});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: (error) => { 
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
      }
    });
  }

}
