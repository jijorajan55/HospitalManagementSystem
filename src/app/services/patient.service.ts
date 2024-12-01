import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:5000/api/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addPatient(patientData: any): Observable<any> {
    return this.http.post(this.apiUrl, patientData);
  }

  updatePatient(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patientData);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
