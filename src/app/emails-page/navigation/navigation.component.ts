import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emails-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class EmailsNavigationComponent implements OnInit {

  sections: string[] = [
    'inbox',
    'sent',
    'draft',
    'spam'
  ];
  returnUrl: string;

  constructor(public router: Router) { }

  ngOnInit() {
    this.returnUrl = this.router.url;
  }

}
