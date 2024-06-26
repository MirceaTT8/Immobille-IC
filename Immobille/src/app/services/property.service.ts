import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Property} from "../interfaces/property";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertyUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  addProperty(propertyData:FormData): Observable<Property>{
    return this.http.post<Property>(`${this.propertyUrl}/addProperty`, propertyData, { withCredentials: true });
  }

  getProperty(id: string): Observable<Property>{
    return this.http.get<Property>(`${this.propertyUrl}/getProperty/${id}`, { withCredentials: true });
  }

  saveProperty(id: string): Observable<any> {
    return this.http.post<any>(`${this.propertyUrl}/saveProperty/${id}`, {}, { withCredentials: true });
  }

  updateProperty(propertyId: string, propertyData: FormData): Observable<any> {
    return this.http.put<any>(`${this.propertyUrl}/updateProperty/${propertyId}`, propertyData, { withCredentials: true });
  }

  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.propertyUrl}/getAllProperties`);
  }

  getProperties(filters?: any): Observable<Property[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.type && filters.type !== 'any') {
        params = params.set('type', filters.type);
      }
      if (filters.location && filters.location !== 'any') {
        params = params.set('location', filters.location);
      }
      if (filters.status) {
        params = params.set('status', filters.status.toLowerCase());
      }
    }

    console.log('Sending request with params:', params.toString()); // Log the request parameters

    return this.http.get<Property[]>(`${this.propertyUrl}/properties`, { params, withCredentials:true});
  }


  getUserProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.propertyUrl}/getUserProperties`);
  }

  deleteProperty(propertyId: any): Observable<any> {
    return this.http.delete<any>(`${this.propertyUrl}/deleteProperty/${propertyId}`, { withCredentials: true });
  }
}
