import { User } from './../user.model';
import { UserSelectionData } from './../interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('user') user: User;
  @Input('isSelected') isSelected: boolean;
  @Output('onDelete') onDelete = new EventEmitter()
  @Output('onSelect') onSelect = new EventEmitter()
  @Output('onDeselect') onDeselect = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  getUserSelectionData (): UserSelectionData {
    return {id: this.user.id}
  }

  deleteUser ($event: MouseEvent) {
    $event.stopPropagation();
    this.onDelete.emit(this.getUserSelectionData());
  }

  toggleSelection ($event: MouseEvent) {
    this.isSelected = !this.isSelected;
    $event.stopPropagation();

    if (this.isSelected) {
      this.onSelect.emit(this.getUserSelectionData());
      return;
    }
    this.onDeselect.emit(this.getUserSelectionData());
  }

}
