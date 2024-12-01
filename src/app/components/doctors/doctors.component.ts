import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  doctorData: any = { name: '', specialization: '' };
  isEditMode: boolean = false;
  currentEditDoctor: any = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  addDoctor(): void {
    this.doctorService.addDoctor(this.doctorData).subscribe(() => {
      this.getDoctors();
      this.resetForm();
    });
  }

  editDoctor(doctor: any): void {
    this.isEditMode = true;
    this.currentEditDoctor = doctor;
    this.doctorData = { ...doctor }; // Load selected doctor's data into the form
  }

  updateDoctor(): void {
    if (this.currentEditDoctor) {
      this.doctorService.updateDoctor(this.currentEditDoctor._id, this.doctorData).subscribe(() => {
        this.getDoctors();
        this.resetForm();
      });
    }
  }

  deleteDoctor(id: string): void {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.getDoctors();
    });
  }

  resetForm(): void {
    this.doctorData = { name: '', specialization: '' };
    this.isEditMode = false;
    this.currentEditDoctor = null;
  }
}
