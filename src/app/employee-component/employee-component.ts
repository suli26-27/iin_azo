import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';
import { Position } from '../interfaces/position';
import { PositionService } from '../shared/position-service';
import { PositionNamePipe } from '../shared/pipe/position-name-pipe';
import { Employee } from '../interfaces/employee';
import { ApiResponse } from '../interfaces/api-response';
import Swal from 'sweetalert2';

@Component({
  imports: [ReactiveFormsModule, PositionNamePipe],
  selector: 'app-employee-component',
  styleUrl: './employee-component.css',
  templateUrl: './employee-component.html',
})
export class EmployeeComponent {

  builder = inject(FormBuilder)
  employeeApi = inject(EmployeeService)
  positionsApi = inject(PositionService)

  //employees!: any[]
  employees = signal<Employee[]>([])
  positions = signal<Position[]>([])

  employeeForm = this.builder.group({
    id: [null as number | null],
    name: [''],
    city: [''],
    salary: [null as number | null],
    positionId: [null as number | null]
  })

  visibleModal = false
  addMode = true


  statusMessage: string = '';
  isError: boolean = false;  

  ngOnInit() {
    console.log('kezdődik...')
    this.getEmployees()
    this.getPositions()
  }

  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: ApiResponse<Employee[]>) => {
        console.log(res)
        if(res.success) {
          this.employees.set(res.data)
        }else {
          
        }
        
      },
      error: () => { }
    })
  }

  toggleModal() {
    this.visibleModal = !this.visibleModal
  }

  showModal() {
    this.visibleModal = true
  }
  startHideModal() {
    this.visibleModal = false
    this.addMode = true
    this.employeeForm.reset()
  }

  saveEmployee() {
    console.log("Mentés...")
    if (this.addMode) {
      this.createEmployee()  
    } else {
      this.updateEmployee()
    }
    
    this.startHideModal()
  }

  createEmployee() {
    const emp = this.employeeForm.getRawValue() as Employee;
    this.employeeApi.createEmployee(emp).subscribe({
      next: (data) => {
        console.log(data)
        this.getEmployees()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getPositions() {
    this.positionsApi.getPositions().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.positions.set(res.data)
      },
      error: () => { }
    })
  }
  editEmployee(emp: Employee) {
    console.log('Edit...')
    console.log(emp)
    this.toggleModal()
    this.addMode = false

    this.employeeForm.patchValue({
      id: emp.id,
      name: emp.name,
      city: emp.city,
      salary: emp.salary,
      positionId: emp.positionId
    })

  }

  updateEmployee() {
    console.log('Ide jön majd az update...')

    const emp = this.employeeForm.getRawValue() as Employee
    
    this.employeeApi.updateEmployee(emp).subscribe({
      next: (res) => { 
        console.log('Eredmény: ' + res)
        this.getEmployees()
      },
      error: () => {}
    })
  }


  startDeleteEmployee(id: number) {
    Swal.fire({
      title: 'Biztosan törlöd?',
      showDenyButton: true,
      confirmButtonText: 'Igen',
      denyButtonText: 'Nem'
    }).then( (res) => {
      if(res.isConfirmed) {
        this.deleteEmployee(id)
      }
    })
    
  }

  deleteEmployee(id: number) {
    console.log(id)
    this.employeeApi.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getEmployees()
        Swal.fire({
        title: 'Sikeres törlés'
    })
      },
      error: (err) => {

      }
    })
  }
}
