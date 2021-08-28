import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTicket } from 'src/app/shared/interface/data-ticket';
import { TicketService } from 'src/app/shared/services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public ticketForm: FormGroup;
  public actTicketForm: FormGroup;

  public hurid: string;
  public usrid: string;
  public editar: boolean;
  public visualizar: boolean;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<TicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTicket,
    private ticketService: TicketService,
  ) {
    this.hurid = data.hurid;
    this.usrid = data.usrid;
    this.editar = data.editar;
    this.visualizar = data.visualizar;
    this.ticketForm = this.fb.group({
      ticnombre: ['', [Validators.required]],
      ticcomentarios: ['', [Validators.required]],
      tichurid: [this.hurid, [Validators.required]],
      ticusridcrea: [this.usrid, [Validators.required]],
    });

    this.actTicketForm = this.fb.group({
      ticid: [data.ticket?.ticid, [Validators.required]],
      ticnombre: [data.ticket?.ticnombre, [Validators.required]],
      ticcomentarios: [data.ticket?.ticcomentarios, [Validators.required]],
      tichurid: [this.hurid, [Validators.required]],
      ticusridmod: [this.usrid, [Validators.required]],
      ticestado: [data.ticket?.ticestado]
    });
  }

  ngOnInit(): void {
  }

  crearTicket() {
    console.log(this.ticketForm.value);
    this.ticketService.crearTicket(this.ticketForm.value)
      .subscribe(res => {
        console.debug(res)
        Swal.fire('Felicidades', 'Ticket creado', 'success')
        this.dialogRef.close();
      }, err => console.debug(err))
  }

  editarTicket() {
    console.log(this.actTicketForm.value);
    this.ticketService.actualizarTicket(this.actTicketForm.value)
      .subscribe((res: any) => {
        console.log(res);
        Swal.fire('Felicidades', 'Ticket actualizado', 'success').finally(() => {
          this.dialogRef.close();
        })
      }, err => console.debug(err))
  }
}
