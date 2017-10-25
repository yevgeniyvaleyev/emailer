import { APP_CONFIG, APP_CONFIG_DATA } from './config';
import { UsersService } from './users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, ReflectiveInjector, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MyDateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MyDateFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    { provide: APP_CONFIG, useValue: APP_CONFIG_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
