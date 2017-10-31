import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

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
