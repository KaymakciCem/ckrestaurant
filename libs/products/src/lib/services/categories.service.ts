import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { environment } from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiUrlCategories = environment.apiURL + 'categories';

    constructor(private http: HttpClient) {}

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrlCategories);
    }

    addCategories(category: Category): Observable<Category> { 
        return this.http.post(this.apiUrlCategories, category);
    }

    updateCategory(category: Category): Observable<Category> { 
        return this.http.put<Category>( this.apiUrlCategories + '/' + category.id, category);
    }

    deleteCategory(categoryId: string): Observable<object> { 
        return this.http.delete<object>(`${this.apiUrlCategories}/${categoryId}`);
    }

}