import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Er404Component } from './er404/er404.component';

const routes: Routes = [
  { path: 'reg', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: Er404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
