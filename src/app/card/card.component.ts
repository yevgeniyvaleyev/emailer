import { User, UserSelectionData } from './../interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('user') user: User;
  @Output('onDelete') onDelete = new EventEmitter()
  @Output('onSelect') onSelect = new EventEmitter()
  @Output('onDeselect') onDeselect = new EventEmitter()

  isSelected: boolean = false;

  constructor() { }

  ngOnInit() {}

  getUserSelectionData (): UserSelectionData {
    return {id: this.user.id}
  }

  deleteUser () {
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
