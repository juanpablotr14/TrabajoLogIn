import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraComponent } from './auth/cambiar-contra/cambiar-contra.component';
import { HomeComponent } from './auth/home/home.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { InicioComponent } from './auth/inicio/inicio.component';

const routes: Routes = [
  {
    path: "auth",
    children:[
      {path: "auth", component: HomeComponent},
      {path: "cambiar-contra", component: CambiarContraComponent},
      {path: "registrar", component: RegistrarComponent},
      {path: "inicio", component: InicioComponent},
      {path: "**", redirectTo: "auth"}
    ]
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
