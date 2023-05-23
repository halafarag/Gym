import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';
import { RegistrComponent } from './components/registr/registr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgConfirmModule } from 'ng-confirm-box';
import { NgToastModule } from 'ng-angular-popup';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: RegistrComponent },
  { path: 'list', component: RegistrationListComponent },
  { path: 'update/:id', component: RegistrComponent },
];
@NgModule({
  declarations: [NavbarComponent, RegistrationListComponent, RegistrComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgConfirmModule,
    NgToastModule,
    Ng2SearchPipeModule,
    BrowserModule,
  ],
  exports: [NavbarComponent],
})
export class GymModule {}
