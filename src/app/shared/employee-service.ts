import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Service()
export class EmployeeService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api/'

    getEmployees() {
        const url = this.host + 'employees'
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.get(url, { headers })
    }

    createEmployee(employee: Employee) {
        const url = this.host + 'employees'
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.post(url, employee, { headers })
    }

    updateEmployee(emp: Employee) {}

}
