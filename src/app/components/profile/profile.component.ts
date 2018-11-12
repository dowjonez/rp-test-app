import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Input() favorites : any;
  @Input() votes : any;
 

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges( changes : SimpleChanges ){
    
  }

}
 