import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './front/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCComponent } from './register-c/register-c.component';
import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListpublicationComponent } from './dashboard/listpublication/listpublication.component';
import { FileUploadModule } from "ng2-file-upload";
import { ThumbnailDirective } from './thumbnail.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddcursusComponent } from "./dashboard/addcursus/addcursus.component";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";
import { CompanyprofileComponent } from './Dashboard/companyprofile/companyprofile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListCursusComponent } from './Dashboard/list-cursus/list-cursus.component';
import { PublicationComponent } from './front/publication/publication.component';
import { SearchPipe } from './search.pipe';
import { FrontComponent } from './front/front.component';
import { AdminstatistiqueComponent } from './dashboard/adminstatistique/adminstatistique.component';
import { AdminlistclientComponent } from './dashboard/adminlistclient/adminlistclient.component';
import { AdminlistcompanyComponent } from './dashboard/adminlistcompany/adminlistcompany.component';
import { AdminlistpublicationComponent } from './dashboard/adminlistpublication/adminlistpublication.component';
import { AdminlistcursusComponent } from './dashboard/adminlistcursus/adminlistcursus.component';
import { CursusComponent } from './front/cursus/cursus.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SearchCompanyPipe } from './search-company.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ListpublicationComponent,
    ThumbnailDirective,
    CompanyprofileComponent,
    AddcursusComponent,
    ListCursusComponent,
    PublicationComponent,
    SearchPipe,
    FrontComponent,
    AdminstatistiqueComponent,
    AdminlistclientComponent,
    AdminlistcompanyComponent,
    AdminlistpublicationComponent,
    AdminlistcursusComponent,
    CursusComponent,
    SearchCompanyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SweetAlert2Module,
    Ng2SearchPipeModule
   

  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
