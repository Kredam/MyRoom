import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations: [
    trigger('onEnterDOM', [
      transition(':enter', [
        style({opacity:0}),
        animate('1s ease-in-out'),
        style({opacity:1})
      ])
    ])
  ]
})
export class EntryComponent implements OnInit {
  isRegisterOnDisplay: boolean;

  constructor() { 
    this.isRegisterOnDisplay = true
  }
  changeIsRegisterOn(state : boolean){
    this.isRegisterOnDisplay = state
  }

  ngOnInit(): void {
  }

}
