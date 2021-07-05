import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { LoginComponent} from './login/login.component';
import { ListpublicationComponent } from './dashboard/listpublication/listpublication.component';
import { RegisterComponent } from './register/register.component';
import { CompanyprofileComponent } from './Dashboard/companyprofile/companyprofile.component';
import { AddcursusComponent } from './dashboard/addcursus/addcursus.component';
import { ListCursusComponent } from './Dashboard/list-cursus/list-cursus.component';
import { FrontComponent } from './front/front.component';
import { HomeComponent } from './front/home/home.component';
import { PublicationComponent } from './front/publication/publication.component';
import { CursusComponent} from './front/cursus/cursus.component';
import { RegisterCComponent } from './register-c/register-c.component';
import { AdminstatistiqueComponent } from './dashboard/adminstatistique/adminstatistique.component';
import { AdminlistclientComponent } from './dashboard/adminlistclient/adminlistclient.component';
import { AdminlistcompanyComponent } from './dashboard/adminlistcompany/adminlistcompany.component';
import { AdminlistpublicationComponent } from './dashboard/adminlistpublication/adminlistpublication.component';
import { AdminlistcursusComponent } from './dashboard/adminlistcursus/adminlistcursus.component';
import {  AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthGuardClientService as AuthGuardClient } from './auth-guard-client.service';
import { AuthGuardCompanyService as AuthGuardCompany} from './auth-guard-company.service';


const routes: Routes = [
 
  {path: "", component: FrontComponent,
children:[
  {path: "", component: HomeComponent},
  {path: "publications", component:PublicationComponent},
  {path: "cursus", component:CursusComponent}
]},
  {
    path:"Dashboard", 
    component: DashboardComponent, 
    children:[
              {
                path:"",
                component: ProfileComponent,
                canActivate: [AuthGuard]
              },
              {
                path:"List",
                component: ListpublicationComponent,
                canActivate: [AuthGuard]
              },
              {
                path:"CompanyProfile",
                component: CompanyprofileComponent,
                canActivate: [AuthGuard, AuthGuardCompany]
              },
              {
                path:"AddCursus",
                component: AddcursusComponent,
                canActivate: [AuthGuard]
              },
              {
                path:"ListCursus",
                component : ListCursusComponent
              },
              {
                path:"Statistique",
                component : AdminstatistiqueComponent
              },
              {
                path:"AdminListClient",
                component : AdminlistclientComponent
              },
              {
                path:"AdminListCompany",
                component : AdminlistcompanyComponent
              },
              {
                path:"AdminListPublication",
                component : AdminlistpublicationComponent
              }, 
              {
                path:"AdminListCursus",
                component : AdminlistcursusComponent,
                canActivate: [AuthGuard]
              }
            ]
  },
  { path: "user/confirm-reset/userName/:userName", component : ResetPasswordComponent},
  { path: "login", component : LoginComponent},
  { path: "registerClient", component : RegisterComponent},
  { path : "registerCompany", component : RegisterCComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
