import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { email } from './../validators/patterns';
import { UserNameValidators } from './../validators/username.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      UserNameValidators.correctEmail,
      Validators.required
    ])
  })

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {}

  get email () {
    return this.form.get('email');
  }

  get password () {
    return this.form.get('password');
  }

  login () {
    this.authService.login().subscribe(({isAuthenticated}) => {
      if (isAuthenticated) {
        const targetUrl = this.route.snapshot.queryParamMap.get('targetUrl');
        this.router.navigate([targetUrl || '/']);
      }
    })
  }

}
