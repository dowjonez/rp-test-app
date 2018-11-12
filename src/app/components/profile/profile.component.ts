import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChange, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Input() favorites : any;
  @Input() votes : any;

  @Output() action = new EventEmitter() ;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges( changes : SimpleChanges ){

  }

  onAction($event){
    this.action.emit($event);
  }
}
