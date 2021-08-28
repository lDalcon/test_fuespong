import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/shared/model/empresa';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public empresas: Array<Empresa>;
  public registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.empresas = [];
    this.registroForm = this.fb.group({
      usrnombre: ['', [Validators.required]],
      usremail: ['', [Validators.required, Validators.email]],
      usrpass: ['', [Validators.required]],
      usrempid: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaService.listarEmpresas()
      .subscribe((res: any) => {
        this.empresas = res.empresas
      }, err => console.warn(err))
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.registroForm.value)
      .subscribe((res: any) => {
        console.log(res)
        Swal.fire('Felicidades!', res.message, 'success').finally(() =>
          this.router.navigateByUrl('/login')
        )

      }, err => console.warn(err))
  }

}
