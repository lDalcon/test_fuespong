import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PagesRoutingModule } from './pages.routing';
import { MaterialModule } from '../shared/material.module';
import { TicketComponent } from './ticket/ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoriaUsuarioComponent } from './historia-usuario/historia-usuario.component';



@NgModule({
  declarations: [
    ProyectosComponent,
    TicketComponent,
    HistoriaUsuarioComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
