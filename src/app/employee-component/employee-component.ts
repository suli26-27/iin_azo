import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';
import { Position } from '../interfaces/position';
import { PositionService } from '../shared/position-service';
import { PositionNamePipe } from '../shared/pipe/position-name-pipe';
import { Employee } from '../interfaces/employee';

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
  employees = signal<any[]>([])
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

  ngOnInit() {
    console.log('kezdődik...')
    this.getEmployees()
    this.getPositions()
  }

  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res)
        // this.employees = res.data
        this.employees.set(res.data)
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
  hideModal() {
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
    
    this.hideModal()
  }

  createEmployee() {
    // szogáltatás hívása
    const emp = this.employeeForm.value as Employee
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

    const raw = this.employeeForm.getRawValue();
    const emp1: Employee = {
      id: raw.id ? Number(raw.id) : 0,
      name: this.employeeForm.value.name ?? '',
      city: this.employeeForm.value.city ?? '',
      salary: raw.salary ? Number(raw.salary) : 0,
      positionId: raw.positionId ? Number(this.employeeForm.value.positionId) : 0
    }

    const emp2 = this.employeeForm.getRawValue() as Employee
    const emp3 = this.employeeForm.value as Employee
    this.employeeApi.updateEmployee(emp3).subscribe({
      next: (res) => { 
        console.log('Eredmény: ' + res)
        this.getEmployees()
      },
      error: () => {}
    })
  }

  deleteEmployee(id: number) {
    console.log(id)
    this.employeeApi.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getEmployees()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
