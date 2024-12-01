import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  appointmentData: any = { patientId: '', doctorId: '', appointmentDate: '' };
  patients: any[] = [];
  doctors: any[] = [];
  isEditMode: boolean = false;
  currentEditAppointmentId: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
    this.loadPatients();
    this.loadDoctors();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
        console.log("Loaded Patients:", this.patients);
      },
      (error) => {
        console.error("Error loading patients:", error);
      }
    );
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
        console.log("Loaded Doctors:", this.doctors);
      },
      (error) => {
        console.error("Error loading doctors:", error);
      }
    );
  }

  addAppointment(): void {
    if (this.appointmentData.patientId && this.appointmentData.doctorId && this.appointmentData.appointmentDate) {
      this.appointmentService.addAppointment(this.appointmentData).subscribe(
        () => {
          this.getAppointments();
          this.resetForm();
        },
        (error) => {
          console.error("Error adding appointment:", error);
        }
      );
    } else {
      console.error("All fields are required!");
    }
  }

  editAppointment(appointment: any): void {
    this.isEditMode = true;
    this.currentEditAppointmentId = appointment._id;
    this.appointmentData = {
      patientId: appointment.patientId._id,
      doctorId: appointment.doctorId._id,
      appointmentDate: new Date(appointment.appointmentDate).toISOString().split('T')[0]
    };
  }

  updateAppointment(): void {
    if (this.currentEditAppointmentId) {
      this.appointmentService.updateAppointment(this.currentEditAppointmentId, this.appointmentData).subscribe(
        () => {
          this.getAppointments();
          this.resetForm();
        },
        (error) => {
          console.error("Error updating appointment:", error);
        }
      );
    }
  }

  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => {
        this.getAppointments();
      },
      (error) => {
        console.error("Error deleting appointment:", error);
      }
    );
  }

  resetForm(): void {
    this.appointmentData = { patientId: '', doctorId: '', appointmentDate: '' };
    this.isEditMode = false;
    this.currentEditAppointmentId = null;
  }
}
