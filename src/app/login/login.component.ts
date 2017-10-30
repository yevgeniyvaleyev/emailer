import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, protected router: Router) { }

  ngOnInit() {}

  login () {
    this.authService.login().subscribe(({isAuthenticated}) => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    })
  }

}
