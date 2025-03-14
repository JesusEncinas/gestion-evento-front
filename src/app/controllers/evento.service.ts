import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

const API_BASE = 'http://localhost:8080/api/eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(API_BASE);
  }

  create(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(API_BASE, evento);
  }

  update(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${API_BASE}/${id}`, evento);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${id}`);
  }
}
