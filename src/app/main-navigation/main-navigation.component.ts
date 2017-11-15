import { MailboxService } from './../mailbox.service';
import { Mailbox } from './../models/mailbox.model';
import { AuthService } from '../auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSelectChange} from '@angular/material'

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  currentMailbox: number;
  mailboxes: Mailbox[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private mailboxService: MailboxService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mailboxService.getAll()
    .subscribe((mailboxes: Mailbox[]) => {
      this.mailboxes = mailboxes;
    })
  }

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }

  logout () {
    this.authService.logout().subscribe(({isAuthenticated}) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

}
