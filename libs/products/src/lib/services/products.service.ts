import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiUrlProducts = environment.apiURL + 'products';

    constructor(private http: HttpClient) {}

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrlProducts);
    }

    getFeaturedProducts(count: number): Observable<Product[]> { 
        return this.http.get<Product[]>(`${this.apiUrlProducts}/get/featured/${count}`);
    }

    addProduct(productData: FormData): Observable<Product> { 
        return this.http.post(this.apiUrlProducts, productData);
    }

    updateProduct(productId: string, productData: FormData): Observable<Product> { 
        return this.http.put<Product>( this.apiUrlProducts + '/' + productId, productData);
    }

    deleteProduct(productId: string): Observable<object> { 
        return this.http.delete<object>(`${this.apiUrlProducts}/${productId}`);
    }

}