import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emails-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class EmailsNavigationComponent implements OnInit {

  items: string[] = [
    'inbox',
    'sent',
    'draft',
    'spam'
  ];

  constructor() { }

  ngOnInit() {
  }

}
