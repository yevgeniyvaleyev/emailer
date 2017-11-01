import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';
import { UserSelectionData, UserRequest } from '../interfaces';
import * as utils from '../utils';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.params.switchMap(({id}) =>
      this.usersService.get(id)
    )
    .subscribe((user: User) => this.user = user)
  }

  deleteUser ({id}: UserSelectionData) {
    this.usersService
      .removeById(id)
      .subscribe(() => {
        this.router.navigate(['/users'])
      })
  }

}
