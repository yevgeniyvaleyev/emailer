import { User } from './../models/user.model';
import { UserSelectionData } from './../interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-card-short',
  templateUrl: './user-card-short.component.html',
  styleUrls: ['./user-card-short.component.css']
})
export class UserCardShortComponent implements OnInit {

  @Input('user') user: User;
  @Output('onDelete') onDelete = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  getUserSelectionData (): UserSelectionData {
    return {id: this.user.id}
  }

  deleteUser ($event: MouseEvent) {
    $event.stopPropagation();
    this.onDelete.emit(this.getUserSelectionData());
  }

}
