import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() navigation = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showProfile( ) {
    console.log("showing profile");
    this.navigation.emit({navigate: "profile"});
  }
}
