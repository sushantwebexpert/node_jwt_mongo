import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserServicesComponent } from './users/user-services/user-services.component';
import { CustomerHomeComponent } from './customers/customer-home/customer-home.component';
import { CustomerServiceComponent } from './customers/customer-service/customer-service.component';
import { Error404Component } from './pages/error404/error404.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './users/admin/admin.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebcamModule } from 'ngx-webcam';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CountdownModule } from 'ngx-countdown';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,TableModule,ModalModule,
  UtilitiesModule,AccordionModule,AlertModule,SpinnerModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
import { WordCloudMakerComponent } from './work/word-cloud-maker/word-cloud-maker.component';
import { WorkComponent } from './work/work.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './components/loader/loader.component';
import { WordcloudComponent } from './components/wordcloud/wordcloud.component';
import { ThresholdComponent } from './components/threshold/threshold.component';
import { MatSelectModule } from '@angular/material/select';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserAddComponent,
    UserEditComponent,
    UserListComponent,
    UserServicesComponent,
    CustomerHomeComponent,
    CustomerServiceComponent,
    Error404Component,
    CustomerComponent,
    AdminComponent,...APP_CONTAINERS, WordCloudMakerComponent, WorkComponent, WebcamComponent, LoaderComponent, WordcloudComponent, ThresholdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,TableModule,AccordionModule,WebcamModule,
    HttpClientModule,ModalModule,BrowserAnimationsModule,MatDialogModule,MatChipsModule,MatIconModule,AlertModule,
    MatProgressBarModule,SpinnerModule,CountdownModule,MatSelectModule
  ],
  providers: [IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
