import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@ckrestaurant/products';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | null = null;
  endSubscription$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder, 
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false],
    });

    this._getCategories();

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

    //send data to the backend as a form data not a json object

    const productFormData = new FormData();
    Object.keys(this.getProductForm()).map((key) => {
      productFormData.append(key, this.getProductForm()[key].value);
      console.log(key, this.getProductForm()[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else { 
      this._addProduct(productFormData);
    }

  }

  onCancel() {
    this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.formGroup.patchValue({image:file});
      this.formGroup.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  getProductForm() { 
    return this.formGroup.controls;
  }

  private _getCategories() {
    this.categoryService.getCategories()
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => { 
        console.log(error);
      }
    });
}


  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;

          this.productService.getProduct(params.id)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe({
            next: (response) => {
              this.getProductForm().name.setValue(response.name);
              this.getProductForm().brand.setValue(response.brand);
              this.getProductForm().countInStock.setValue(response.countInStock);
              this.getProductForm().price.setValue(response.price);
              this.getProductForm().category.setValue(response.category.id);
              this.getProductForm().description.setValue(response.description);
              this.getProductForm().isFeatured.setValue(response.isFeatured);
              this.imageDisplay = response.image;
              this.getProductForm().image.setValidators([]);
              this.getProductForm().image.updateValueAndValidity();
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
            }
          });
      }
    })
  }

  private _updateProduct(product: FormData) {
    this.productService.updateProduct(this.currentProductId, product)
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: (product: Product) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Product ${product.name} Updated`});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: (error) => { 
        console.log(error);
      }
    });
  }

  private _addProduct(productData: FormData) {
    this.productService.addProduct(productData)
    .pipe(takeUntil(this.endSubscription$))
    .subscribe({
      next: (product: Product) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Procuct ${product.name} Added`});
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
