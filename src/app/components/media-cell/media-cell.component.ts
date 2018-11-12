import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

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
  @Input() favId: boolean;
  @Input() voteObject : any;

  @Output() action = new EventEmitter<any>();

  constructor( private api : ApiService, private cd: ChangeDetectorRef ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){


  }

  vote(like : boolean){
    //delete vote if vote matches previous vote
    if ( this.liked == like && this.voteObject ){
      if (!this.voteObject){
        return
      }

      this.api.delete(this.voteObject.id, "votes").subscribe(res=>{
        this.voteObject.id = null
        this.cd.detectChanges()
        this.action.emit({  type: "vote", value: this.voteObject.value, id: this.voteObject.id, sub_id: this.api.sub_id, image_id: this.image.id});
      });
    }
    //update vote if
    else {
      this.api.post(this.image, like, "votes").subscribe(res=>{
        this.voteObject = {id: res.id ,value : like ? 1 : 0}
        this.cd.detectChanges()
        this.action.emit({ type: "vote", value: this.voteObject.value,  id: this.voteObject.id,  sub_id: this.api.sub_id, image_id: this.image.id});
      });
    }
    this.liked = like;
    this.cd.detectChanges()
  }


    toggleFavorite(){
      let method
      : string;
        if(this.favorited){
          this.favorited = false;
        }else{
          this.favorited = true;
        }
        this.cd.detectChanges()

        if ( !this.favorited ){

          this.api.delete(this.favId, "favourites")
          .pipe(
            map(res=>{
              let favId = this.favId;
              this.favId = null;
              this.cd.detectChanges()
              this.action.emit({ type: "favorite", id: favId, image:this.image, favorite: this.favorited, sub_id: this.api.sub_id, image_id: this.image.id} )
            })
          )
          .subscribe();
        }else {
          this.api.post(this.image, this.favorited, "favourites").
          pipe(
            map(res=>{
              this.favId = res['id'];

              this.cd.detectChanges()
              this.action.emit({ type: "favorite",  id: this.favId, image: this.image, favorite: this.favorited, sub_id: this.api.sub_id, image_id: this.image.id })
            })
          ).
          subscribe();
        }
    this.cd.detectChanges()
  }


}
