import { MailboxService } from './mailbox.service';
import { ContactValidators } from './validators/contact.validator';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { EmailsService } from './emails.service';
import { APP_CONFIG_DATA } from './config/config';
import { APP_CONFIG } from './config/tokens';
import { ContactsService } from './contacts.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, InjectionToken, ReflectiveInjector, Injector, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { ContactCardDetailedComponent } from './contact-card-detailed/contact-card-detailed.component';
import { MyDateFormatPipe } from './date-format.pipe';
import { AddContactComponent } from './contact-edit/contact-edit.component';
import { EmailsListComponent } from './emails-list/emails-list.component';
import { LoginComponent } from './login/login.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { EmailsNavigationComponent } from './emails-page/navigation/navigation.component';
import { EmailComponent } from './email/email.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { ContactCardShortComponent } from './contact-card-short/contact-card-short.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { EmailsPageComponent } from './emails-page/emails-page.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { EmailComposeComponent } from './email-compose/email-compose.component';

const pages = [
  { path: '', redirectTo: 'emails/inbox', pathMatch: 'full' },
  {
    path: 'emails',
    component: EmailsPageComponent,
    children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: 'compose', component: EmailComposeComponent },
      {
        path: ':type', children: [
          { path: '', component: EmailsListComponent },
          { path: ':id', component: EmailComponent }
        ]
      }
    ]
  },
  {
    path: 'contacts',
    children: [
      { path: '', component: ContactsListComponent },
      { path: ':id', component: ContactDetailsComponent }
    ]
  }
];
const routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'mailbox/0', pathMatch: 'full' },
      {
        path: 'mailbox',
        children: [
          {
            path: ':boxid',
            component: MailboxComponent,
            children: pages
          }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ContactCardDetailedComponent,
    MyDateFormatPipe,
    AddContactComponent,
    EmailsListComponent,
    LoginComponent,
    ContactsListComponent,
    EmailsNavigationComponent,
    EmailComponent,
    MainNavigationComponent,
    ContactCardShortComponent,
    ContactDetailsComponent,
    EmailsPageComponent,
    MailboxComponent,
    EmailComposeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ContactsService,
    EmailsService,
    AuthGuardService,
    AuthService,
    MailboxService,
    ContactValidators,
    { provide: APP_CONFIG, useValue: APP_CONFIG_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
