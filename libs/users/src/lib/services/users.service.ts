import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { environment } from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiUrlUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient) {}

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrlUsers);
    }

    addUser(user: User): Observable<User> { 
        return this.http.post(this.apiUrlUsers, user);
    }

    updateUser(user: User): Observable<User> { 
        return this.http.put<User>( this.apiUrlUsers + '/' + user.id, user);
    }

    deleteUser(categoryId: string): Observable<object> { 
        return this.http.delete<object>(`${this.apiUrlUsers}/${categoryId}`);
    }
}