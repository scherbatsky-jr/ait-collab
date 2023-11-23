import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConnectionsComponent } from './connections/connections.component';
import { EventsComponent } from './events/events.component';
import { ProfileBoxComponent } from './profile-box/profile-box.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

import { WebsocketService } from './_services/websocket.service';
import { NotificationComponent } from './notification/notification.component';
import { PasswordMatchDirective } from './_directives/password-match.directive';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    ConnectionsComponent,
    EventsComponent,
    ProfileBoxComponent,
    ChatboxComponent,
    NotificationComponent,
    PasswordMatchDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbDatepickerModule,
    AngularMarkdownEditorModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
