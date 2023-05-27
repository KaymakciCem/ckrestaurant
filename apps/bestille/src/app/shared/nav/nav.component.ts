import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bestille-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {

  constructor() { 
    console.log('NavComponent');
  }

  ngOnInit(): void {
    console.log('NavComponent');
  }

}
