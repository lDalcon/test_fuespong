import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.urlServices;


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  private getToken() {
    return sessionStorage.getItem('token') || '';
  }

  crearTicket(formData: any) {
    return this.http.post(`${url}ticket`, formData, { headers: { 'x-token': this.getToken() } })
  }

  cancelarTicket(formData: any){
    return this.http.put(`${url}ticket/cancelar`, formData, { headers: { 'x-token': this.getToken() } })
  }

  actualizarTicket(formData: any){
    return this.http.put(`${url}ticket/${formData.ticid}`, formData, { headers: { 'x-token': this.getToken() } })
  }
}

