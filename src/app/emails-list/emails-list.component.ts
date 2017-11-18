import { MailboxService } from './../mailbox.service';
import { Contact } from './../models/contact.model';
import { Email } from './../models/email.model';
import { EmailsService } from './../emails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { removeItemFromList } from '../utils';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.css']
})
export class EmailsListComponent implements OnInit {

  selectedIds: number[] = [];
  emails: Email[];
  searchStream: Observable<Email[]>;
  deleteStream: Observable<boolean>;
  type: string;
  searchSubject = new Subject<string>();
  deleteSubject = new Subject<number|number[]>();

  constructor(
    private route: ActivatedRoute,
    private emailsServise: EmailsService,
    private mailboxService: MailboxService
  ) {
    this.searchStream = this.searchSubject
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((term) =>
        this.emailsServise.search(term, this.type));

    this.deleteStream = this.deleteSubject
      .switchMap((data) => Array.isArray(data) ?
        this.emailsServise.deleteSelected(data) :
        this.emailsServise.delete(data))
  }

  ngOnInit() {
    this.route.params
    .map(({type}) => {
      this.type = type;
    })
    .merge(this.deleteStream)
    .merge(this.mailboxService.getId())
    .switchMap(() => this.emailsServise.getAllByType(this.type))
    .merge(this.searchStream)
    .subscribe((emails: Email[]) => this.emails = emails)
  }

  selectEmail (isChecked: boolean, id: number) {
    if (isChecked) {
      this.selectedIds = [...this.selectedIds, id];
      return;
    }
    const index = this.selectedIds.indexOf(id);
    this.selectedIds = removeItemFromList(this.selectedIds, index);
  }

  search (term: string) {
    this.searchSubject.next(term)
  }

  delete (id: number) {
    this.deleteSubject.next(id);
  }

  deleteSelected () {
    this.deleteSubject.next(this.selectedIds);
  }

}
