import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.urlServices;


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(
    private http: HttpClient
  ) { }

  private getToken() {
    return sessionStorage.getItem('token') || '';
  }

  getProyectos(empid: string){
    return this.http.get(`${url}proyecto/${empid}`, {headers: {'x-token': this.getToken() }})
  }
}
