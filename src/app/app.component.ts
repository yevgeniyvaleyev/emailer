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
  selectedUserIds: number[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit () {
    this.usersService.getAll().subscribe((users) => this.users = users);
  }

  deleteUser (user: UserSelectionData) {
    const index = this.users.findIndex(({id}) => user.id === id);
    if (index >= 0) {
      this.users = utils.removeItemFromList(this.users, index);
      this.removeUserFromSelection(user);
    }
  }

  isUserInSelection ({id}: UserSelectionData) {
    return this.selectedUserIds.indexOf(id) >= 0;
  }

  addUserToSelection (user: UserSelectionData) {
    if (!this.isUserInSelection(user)) {
      this.selectedUserIds = [...this.selectedUserIds, user.id]
    }
  }

  removeUserFromSelection (user: UserSelectionData) {
    if (this.isUserInSelection(user)) {
      const index = this.selectedUserIds.indexOf(user.id)
      this.selectedUserIds = utils.removeItemFromList(this.selectedUserIds, index);
    }
  }
}
