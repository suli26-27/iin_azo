import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Position } from '../interfaces/position';

@Service()
export class PositionService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api'

    getPositions() {
        const url = `${this.host}/positions`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.get<Position[]>(url, { headers })
    }

    createPosition(pos: Position) {
        const url = `${this.host}/positions`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.post<Position>(url, pos, { headers })
    }
    updatePosition(pos: Position) {
        const url = `${this.host}/positions/${pos.id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.put<Position>(url, pos, { headers })
    }
    deletePosition(id: number) {
        const url = `${this.host}/positions/${id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.delete<Position>(url, { headers })
    }

}
