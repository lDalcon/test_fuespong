import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistoriaUsuario } from 'src/app/shared/model/historia-usuario';
import { Proyecto } from 'src/app/shared/model/proyecto';
import { Ticket } from 'src/app/shared/model/tickets';
import { Usuario } from 'src/app/shared/model/usuario';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';
import { HistoriaUsuarioComponent } from '../historia-usuario/historia-usuario.component';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  private usuarioSesion: Usuario;
  public proyectos: Array<Proyecto>;
  public displayedColumns: Array<string>;

  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private ticketService: TicketService
  ) {
    this.usuarioSesion = this.usuarioService.getUsuarioSesion();
    this.proyectos = [];
    this.displayedColumns = [
      'ticid',
      'ticnombre',
      'ticcomentarios',
      'ticfechacrea',
      'ticestado',
      'accion'
    ];
  }

  ngOnInit(): void {
    this.listarProyectos();
  }

  listarProyectos() {
    this.proyectoService.getProyectos(this.usuarioSesion.usrempid || '')
      .subscribe((res: any) => {
        console.log(res)
        this.proyectos = res.proyectos;
      }, err => console.warn(err))
  }

  crearTicket(historia: HistoriaUsuario) {

    const dialogRef = this.dialog.open(TicketComponent, {
      width: '80%',
      data: {
        hurid: historia.hurid,
        usrid: this.usuarioSesion.usrid,
        editar: false
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    })
  }

  editarTicket(ticket: Ticket) {

    const dialogRef = this.dialog.open(TicketComponent, {
      width: '80%',
      data: {
        hurid: ticket.tichurid,
        usrid: this.usuarioSesion.usrid,
        editar: true,
        ticket
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    })
  }

  crearHistoria(proyecto: Proyecto) {

    const dialogRef = this.dialog.open(HistoriaUsuarioComponent, {
      width: '80%',
      data: {
        usrid: this.usuarioSesion.usrid,
        visualizar: false,
        proyecto
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
  }

  cancelarTicket(ticket: Ticket) {
    console.log(ticket)
    this.ticketService.cancelarTicket(ticket)
      .subscribe((res: any) => {
        Swal.fire('Felicidades!', res.message, 'success').finally(() => {
          this.ngOnInit();
        })
      }, err => console.log(err))
  }

  visualizarTicket(ticket: Ticket){
    const dialogRef = this.dialog.open(TicketComponent, {
      width: '80%',
      data:{
        hurid: ticket.tichurid,
        usrid: this.usuarioSesion.usrid,
        editar: false,
        visualizar: true,
        ticket
      }
    });

    dialogRef.afterClosed().subscribe(res=>{
      this.ngOnInit();
    })
  }
}
