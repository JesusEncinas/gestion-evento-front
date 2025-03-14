import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { EventoListaComponent } from './views/evento-lista/evento-lista.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta del login
  { path: 'eventos', component: EventoListaComponent }, // Ruta para eventos
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: '**', redirectTo: '/login' }, // Cualquier ruta desconocida redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
