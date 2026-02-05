import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerProfile } from '../models/customer-profile.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerProfileService {
  private apiUrl = `${environment.apiUrl}/customer-profiles`;

  constructor(private http: HttpClient) {}

  getAllProfiles(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.apiUrl);
  }

  getProfileById(id: string): Observable<CustomerProfile> {
    return this.http.get<CustomerProfile>(`${this.apiUrl}/${id}`);
  }

  getProfileByUserId(userId: string): Observable<CustomerProfile> {
    return this.http.get<CustomerProfile>(`${this.apiUrl}/user/${userId}`);
  }

  createProfile(profile: Partial<CustomerProfile>): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(this.apiUrl, profile);
  }

  updateProfile(id: string, profile: Partial<CustomerProfile>): Observable<CustomerProfile> {
    return this.http.put<CustomerProfile>(`${this.apiUrl}/${id}`, profile);
  }

  deleteProfile(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
