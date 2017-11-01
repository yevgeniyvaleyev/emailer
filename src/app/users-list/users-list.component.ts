import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';
import { UserSelectionData, UserRequest } from '../interfaces';
import * as utils from '../utils';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  selectedUserId: string|null;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit () {
    this.getUsers();
  }

  getUsers () {
    this.usersService
      .getAll()
      .subscribe((users: User[]) => this.users = users);
  }

  deleteUser ({id}: UserSelectionData) {
    this.usersService
      .removeById(id)
      .subscribe(() => this.getUsers())
  }

  openUserDetails (id: string) {
    this.router.navigate([`/users/${id}`]);
  }

  addUser (data: UserRequest) {
    this.usersService
      .add({
        ...data,
        birthdate: new Date(data.birthdate).toUTCString()
      })
      .subscribe(() => this.getUsers());
  }

  toggleUserSelection ({id}: UserSelectionData) {
    this.selectedUserId = (this.selectedUserId !== id) ? id : null;
  }

}
