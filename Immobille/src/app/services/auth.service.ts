import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserLogin} from "../interfaces/user-login";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Property} from "../interfaces/property";
import {Review} from "../interfaces/review";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private userUrl = 'http://localhost:5000/api';

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  login(user: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user, { withCredentials: true });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/getUser`, { withCredentials: true }).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }
  getUserProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/getUserProperties`);
  }

  logout(): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/logout`, null, { withCredentials: true });
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.userUrl}/updateUser/${userId}`, userData, { withCredentials: true });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getReviewsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.userUrl}/getReviewsById/${userId}`);
  }

  addReview(reviewData: FormData): Observable<Review> {
    return this.http.post<Review>(`${this.userUrl}/addReview`, reviewData, { withCredentials: true });
  }


}
