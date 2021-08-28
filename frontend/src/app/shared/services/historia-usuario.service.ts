import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.urlServices;


@Injectable({
  providedIn: 'root'
})
export class HistoriaUsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  private getToken() {
    return sessionStorage.getItem('token') || '';
  }

  crearHistoria(formData: any) {
    return this.http.post(`${url}historia`, formData, { headers: { 'x-token': this.getToken() } })
  }
}
