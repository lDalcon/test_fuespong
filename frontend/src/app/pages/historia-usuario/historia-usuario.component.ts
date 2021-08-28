import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHistoria } from 'src/app/shared/interface/data-historia';
import { HistoriaUsuarioService } from 'src/app/shared/services/historia-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-usuario',
  templateUrl: './historia-usuario.component.html',
  styleUrls: ['./historia-usuario.component.css']
})
export class HistoriaUsuarioComponent implements OnInit {

  public historiaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HistoriaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataHistoria,
    private historiaService: HistoriaUsuarioService
  ) {
    this.historiaForm = this.fb.group({
      hurnombre: ['', [Validators.required]],
      hurrole: ['', [Validators.required]],
      hurfuncionalidad: ['', [Validators.required]],
      hurbeneficio: ['', [Validators.required]],
      hurcriaceptacion: ['', [Validators.required]],
      hurcomentarios: ['', [Validators.required]],
      hurproid: [data.proyecto?.proid, [Validators.required]],
      hurusridcrea: [data.usrid, [Validators.required]],
      ticnombre: ['', [Validators.required]],
      ticcomentarios: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  crearHistoria() {
    this.historiaService.crearHistoria(this.historiaForm.value)
      .subscribe((res: any) => {
        Swal.fire('Felicidades', res.message, 'success')
          .finally(() => {
            this.dialogRef.close()
          })
      });

  }
}
