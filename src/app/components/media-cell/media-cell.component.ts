import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-media-cell',
  templateUrl: './media-cell.component.html',
  styleUrls: ['./media-cell.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MediaCellComponent implements OnInit {
  @Input() image : any;
  @Input() liked: boolean;
  @Input() favorited: boolean;
  @Input() voteId : string;
  @Input() favId : string;
  @Output() action = new EventEmitter<any>();
  
  constructor( private api : ApiService, private cd: ChangeDetectorRef ) { }
  
  ngOnInit() {
  }
  
  vote(like : boolean){
    let method: string;
    if ( this.liked == like && this.voteId ){
      if (!this.voteId){
        return
      }
      this.api.delete(this.voteId, "votes").subscribe(res=>{
        this.voteId = null
        this.cd.detectChanges()
        this.action.emit( {id: this.voteId, value: 1, sub_id: this.api.sub_id, image_id: this.image.id});
      });
    }else {
      this.api.post(this.image, like, "votes").subscribe(res=>{
        this.voteId = res.id;
        this.cd.detectChanges()
        this.action.emit({id: this.voteId, value: 0, sub_id: this.api.sub_id, image_id: this.image.id});
      });
    }
    this.liked = like;
    this.cd.detectChanges()
  }

    
    toggleFavorite(){
      let method: string;
        if(this.favorited){
          this.favorited = false;
        }else{
          this.favorited = true;
        }
        
        if ( this.favId ){
          this.api.delete(this.favId, "favourites").subscribe(function(res){
            this.favId = null
            this.cd.detectChanges()
            this.action.emit( {favorite: this.favorited, sub_id: this.api.sub_id, image_id: this.image.id} )
          });
        }else {
          this.api.post(this.image, this.favorited, "favourites").subscribe(function(res){
            this.favId = res.id;
            this.cd.detectChanges()
            this.action.emit({favorite: this.favorited, sub_id: this.api.sub_id, image_id: this.image.id})
          });
        }
    this.cd.detectChanges()
  } 

  
}
