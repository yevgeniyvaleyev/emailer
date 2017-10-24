import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { User, UserSelectionData } from './interfaces';
import * as utils from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  users: User[];
  selectedUserId: number|null;

  constructor(private usersService: UsersService) {}

  ngOnInit () {
    this.usersService.getAll().subscribe((users: User[]) => this.users = users);
  }

  deleteUser (user: UserSelectionData) {
    const index = this.users.findIndex(({id}) => user.id === id);
    if (index >= 0) {
      this.users = utils.removeItemFromList(this.users, index);
    }
  }

  toggleUserSelection ({id}: UserSelectionData) {
    this.selectedUserId = (this.selectedUserId !== id) ? id : null;
  }
}
