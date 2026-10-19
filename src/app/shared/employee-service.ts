import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class EmployeeService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api/'

    getEmployees() {
        const url = this.host + 'employees'
        return this.http.get(url)
    }

    createEmployee(employee: any) {
        const url = this.host + 'employees'
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.post(url, employee, { headers })
    }

}
