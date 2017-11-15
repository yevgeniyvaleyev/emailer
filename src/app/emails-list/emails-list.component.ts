import { User } from './../models/user.model';
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
  emailsStream: Observable<Email[]>;
  type: string;
  searchStream = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private emailsServise: EmailsService
  ) {
    this.emailsStream = this.searchStream
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((term) =>
        this.emailsServise.search(term, this.type))
  }

  ngOnInit() {
    this.route.params.switchMap(({type}) => {
      this.type = type;
      return this.emailsServise.getAllByType(type)
    })
    .merge(this.emailsStream)
    .subscribe((emails: Email[]) => this.emails = emails)
  }

  selectEmail (checked: boolean, id: number) {
    if (checked) {
      this.selectedIds = [...this.selectedIds, id];
    } else {
      const index = this.selectedIds.indexOf(id);
      this.selectedIds = removeItemFromList(this.selectedIds, index);
    }
  }

  deleteSelected () {
    this.emailsServise
      .deleteSelected(this.selectedIds)
      .switchMap(() => this.emailsServise.getAllByType(this.type))
      .subscribe((emails: Email[]) => this.emails = emails)
  }

}
