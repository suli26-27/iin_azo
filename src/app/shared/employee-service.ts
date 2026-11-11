import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { ApiResponse } from '../interfaces/api-response';
// import { throwError } from 'rxjs';

@Service()
export class EmployeeService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api'

    getEmployees() {
        const url = this.host + '/employees'
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.get<ApiResponse<Employee[]>>(url, { headers })
    }

    createEmployee(employee: Employee) {
        const url = this.host + '/employees'
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.post<ApiResponse<Employee>>(url, employee, { headers })
    }

    updateEmployee(emp: Employee) {
        const url = `${this.host}/employees/${emp.id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.put<ApiResponse<Employee>>(url, emp, { headers })
    }

    deleteEmployee(id: number) {
        
        // return throwError(() => new Error('Szándékos teszt hiba'));

        const url = `${this.host}/employees/${id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }   
        
        return this.http.delete<ApiResponse<Employee>>(url, { headers })
    }

}
