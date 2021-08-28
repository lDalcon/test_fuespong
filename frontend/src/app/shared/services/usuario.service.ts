import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { of } from 'rxjs';


const url = environment.urlServices;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  private getToken() {
    return sessionStorage.getItem('token') || '';
  }

  login(formData: any) {
    return this.http.post(`${url}auth`, formData)
      .pipe(
        tap((res: any) => {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('usuario', JSON.stringify(res.usuario))
        })
      )
  }

  crearUsuario(formData: any){
    return this.http.post(`${url}usuario`, formData)
  }

  validarToken() {
    return this.http.get(`${url}auth/renewToken`, { headers: { 'x-token': this.getToken() } })
      .pipe(
        tap((res: any) => {
          sessionStorage.setItem('token', res.token);
        }),
        map(res => true),
        catchError(err => of(false))
      )
  }

  getUsuarioSesion(){
    return JSON.parse(sessionStorage.getItem('usuario') || '');
  }
}
