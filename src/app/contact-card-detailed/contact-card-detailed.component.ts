import { Contact } from './../models/contact.model';
import { ContactSelectionData } from './../interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-card-detailed',
  templateUrl: './contact-card-detailed.component.html',
  styleUrls: ['./contact-card-detailed.component.css']
})
export class ContactCardDetailedComponent implements OnInit {

  @Input('contact') contact: Contact;
  @Input('isSelected') isSelected: boolean;
  @Output('onDelete') onDelete = new EventEmitter()
  @Output('onSelect') onSelect = new EventEmitter()
  @Output('onDeselect') onDeselect = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  getContactSelectionData (): ContactSelectionData {
    return {id: this.contact.id}
  }

  deleteContact ($event: MouseEvent) {
    $event.stopPropagation();
    this.onDelete.emit(this.getContactSelectionData());
  }

  toggleSelection ($event: MouseEvent) {
    this.isSelected = !this.isSelected;
    $event.stopPropagation();

    if (this.isSelected) {
      this.onSelect.emit(this.getContactSelectionData());
      return;
    }
    this.onDeselect.emit(this.getContactSelectionData());
  }

}
