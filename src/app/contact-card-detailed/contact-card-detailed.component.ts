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
  @Input('editable') isEditable: Boolean;
  @Output('onDelete') onDelete = new EventEmitter()
  @Output('onEdit') onEdit = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  getContactSelectionData (): ContactSelectionData {
    return {id: this.contact.id}
  }

  deleteContact ($event: MouseEvent) {
    $event.stopPropagation();
    this.onDelete.emit(this.getContactSelectionData());
  }

  editContact ($event: MouseEvent) {
    $event.stopPropagation();
    this.onEdit.emit(this.getContactSelectionData());
  }

}
