import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserLogin} from "../interfaces/user-login";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // login(user: UserLogin): Observable<any>{
  //   return this.http.post<any>(`${this.apiUrl}/login`, user);
  // }
}
