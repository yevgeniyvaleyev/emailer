import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit () {}

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }

  logout () {
    this.authService.logout().subscribe(({isAuthenticated}) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}
