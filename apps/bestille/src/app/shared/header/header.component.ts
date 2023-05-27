import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bestille-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor() {
    console.log('HeaderComponent constructor');
  }

  ngOnInit(): void {
    console.log('HeaderComponent');
  }
}
