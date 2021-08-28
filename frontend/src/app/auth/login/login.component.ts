import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      usremail: ['', [Validators.required, Validators.email]],
      usrpass: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.usuarioService.login(this.loginForm.value)
      .subscribe((res:any)=> {
        console.debug(res);
        this.router.navigateByUrl('/layout');
      }, err => {
        console.warn(err),
        Swal.fire('Error!', err.error.message, 'error');
      })
  }
}
