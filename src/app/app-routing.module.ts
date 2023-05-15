import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './users/admin/admin.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserServicesComponent } from './users/user-services/user-services.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerHomeComponent } from './customers/customer-home/customer-home.component';
import { CustomerServiceComponent } from './customers/customer-service/customer-service.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from './auth/auth.guard'
import { DefaultLayoutComponent } from './containers';
import { WorkComponent } from './work/work.component';
import { WordCloudMakerComponent } from './work/word-cloud-maker/word-cloud-maker.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      { path: '', component: HomeComponent},
      { path: 'admin', component: AdminComponent,
        canActivate:[AuthGuard],
        children: [ 
          { 
              path: '', 
              component: UserListComponent
          },
          { 
              path: 'user-add', 
              component: UserAddComponent
          },
          { 
              path: 'user-edit/:id', 
              component: UserEditComponent
          },
          { 
              path: 'user-services', 
              component: UserServicesComponent
          },
        ]
      },
      { path: 'customer',
        component: CustomerComponent,
        canActivate:[AuthGuard],
        children: [ 
          { 
              path: '', 
              component: CustomerHomeComponent
          },
          {
              path: 'services', 
              component: CustomerServiceComponent
          },
        ]
      },
      { path: 'work',
        component: WorkComponent,
        canActivate:[AuthGuard],
        children: [ 
          { 
              path: '', 
              component: WorkComponent
          },
          {
              path: 'wcm',
              component: WordCloudMakerComponent
          },
        ]
      },
    ]
  },
  { path: "home",  component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
