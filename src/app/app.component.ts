import { User } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { UserSelectionData, UserRequest } from './interfaces';
import * as utils from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  users: User[] = [];
  selectedUserId: string|null;

  constructor(private usersService: UsersService) {}

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

  addUser () {
    const data: UserRequest = {
      fullName: 'Kolya Pupkin',
      email: 'adsa@sdf.com',
      dateOfBirth: 1508915659095
    }
    this.usersService
      .add(data)
      .subscribe(() => this.getUsers());
  }

  toggleUserSelection ({id}: UserSelectionData) {
    this.selectedUserId = (this.selectedUserId !== id) ? id : null;
  }
}
