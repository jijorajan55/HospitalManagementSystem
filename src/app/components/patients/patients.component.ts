import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  patientData: any = { name: '', age: null, gender: '' };
  isEditMode: boolean = false;
  currentEditPatient: any = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  addPatient(): void {
    this.patientService.addPatient(this.patientData).subscribe(() => {
      this.getPatients();
      this.resetForm();
    });
  }

  editPatient(patient: any): void {
    this.isEditMode = true;
    this.currentEditPatient = patient;
    this.patientData = { ...patient }; // Load selected patient's data into the form
  }

  updatePatient(): void {
    if (this.currentEditPatient) {
      this.patientService.updatePatient(this.currentEditPatient._id, this.patientData).subscribe(() => {
        this.getPatients();
        this.resetForm();
      });
    }
  }

  deletePatient(id: string): void {
    this.patientService.deletePatient(id).subscribe(() => {
      this.getPatients();
    });
  }

  resetForm(): void {
    this.patientData = { name: '', age: null, gender: '' };
    this.isEditMode = false;
    this.currentEditPatient = null;
  }
}
