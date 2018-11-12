import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() data : any;
  @Input() currentImage : string;
  @Output() action = new EventEmitter;
  private currentImageIndex: number = 0;
  constructor(private api : ApiService, private cd : ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges( changes : SimpleChanges ){
    if (changes.data && changes.data.firstChange ){
      this.currentImage = changes.data.currentValue[this.currentImageIndex].id
    }
  }

  onAction(action){
    this.action.emit(action)
    if (this.currentImageIndex  < this.data.length -1  ){
      this.currentImageIndex+=1;
      this.currentImage = this.data[this.currentImageIndex].id;
    }else{
     this.api.getImages().subscribe(res=>{
       this.data = res;
       
       this.currentImage = this.data[0].id
       this.currentImageIndex = 0;
       this.cd.detectChanges()
     })
    }
  }
}
