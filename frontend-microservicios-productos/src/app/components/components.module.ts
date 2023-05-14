import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: 'registro', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ComponentsModule { }
