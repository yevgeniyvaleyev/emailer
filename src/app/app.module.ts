import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { EmailsService } from './emails.service';
import { APP_CONFIG_DATA } from './config/config';
import { APP_CONFIG } from './config/tokens';
import { UsersService } from './users.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, InjectionToken, ReflectiveInjector, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MyDateFormatPipe } from './date-format.pipe';
import { AddUserComponent } from './add-user/add-user.component';
import { EmailsListComponent } from './emails-list/emails-list.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EmailsNavigationComponent } from './emails-list/navigation/navigation.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MyDateFormatPipe,
    AddUserComponent,
    EmailsListComponent,
    LoginComponent,
    UsersListComponent,
    EmailsNavigationComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/emails/inbox', pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'emails/:type', component: EmailsListComponent, canActivate: [AuthGuardService] },
      { path: 'email/:id', component: EmailComponent, canActivate: [AuthGuardService] },
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
    UsersService,
    EmailsService,
    AuthGuardService,
    AuthService,
    { provide: APP_CONFIG, useValue: APP_CONFIG_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
