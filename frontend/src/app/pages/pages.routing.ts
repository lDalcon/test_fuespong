import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProyectosComponent } from './proyectos/proyectos.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'proyectos'
            },
            {
                path:'proyectos',
                component: ProyectosComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
