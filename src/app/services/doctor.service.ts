import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5000/api/doctors';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addDoctor(doctorData: any): Observable<any> {
    return this.http.post(this.apiUrl, doctorData);
  }

  updateDoctor(id: string, doctorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctorData);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
