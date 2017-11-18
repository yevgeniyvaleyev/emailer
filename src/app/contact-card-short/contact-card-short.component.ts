import { Contact } from './../models/contact.model';
import { ContactSelectionData } from './../interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-card-short',
  templateUrl: './contact-card-short.component.html',
  styleUrls: ['./contact-card-short.component.css']
})
export class ContactCardShortComponent implements OnInit {

  @Input('contact') contact: Contact;
  @Output('onDelete') onDelete = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  getContactSelectionData (): ContactSelectionData {
    return {id: this.contact.id}
  }

  deleteContact ($event: MouseEvent) {
    $event.stopPropagation();
    this.onDelete.emit(this.getContactSelectionData());
  }

}
