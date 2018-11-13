import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './services/api.service';
import { Observable, of, merge, concat, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  @Output() imageEvent = new EventEmitter();
  @Input() data : Observable<any>;
  @Input() currentView : string = "list";
  private favorites : BehaviorSubject<any>;
  private votes : BehaviorSubject<any>;
  private images : BehaviorSubject<any>;
  title = 'rp-test-app';


  constructor(private api : ApiService , private cd : ChangeDetectorRef){

  }

  ngOnInit(){
   this.data = combineLatest(
     this.api.getImages(),
     this.api.get("favourites"),
     this.api.get("votes")
   )

   this.data.pipe(
     map( res=>{
       let votes = {}

       res[2].forEach( img => {
         votes[ img.image_id ] = img;
       });

       return [res[0], res[1], votes];
     })
   ).subscribe(res=>{
     this.images = new BehaviorSubject(res[0])
     this.favorites = new BehaviorSubject( res[1]);
     this.votes = new BehaviorSubject( res[2] );
     this.updateFavorites();
   })
  }

  navigate( test ){
    this.currentView = test.navigate;
  }

  onAction($event){
    if($event.type == "vote"){
      let votes =  this.votes.getValue()
      votes[$event.image_id] = $event


      this.votes.next( votes )
      this.cd.detectChanges();
      this.updateFavorites()
    }

    if($event.type == "favorite" ){
      //handle removing a favorite
      let favs =  this.favorites.getValue()
      if (favs.length > 0){
        if( !$event.favorite ){
          favs = favs.filter( item=>{
            return item.image_id != $event.image_id
          })

        }else{
          let exists = favs.find( item=>{
            return item.image_id == $event.image_id
          })
          if (!exists){
            favs.push($event)
          }
        }
      }
      //handle adding a favorite
      else{
        favs = [$event];
      }

      this.favorites.next(favs)

      this.cd.detectChanges();
      this.updateFavorites()
    }
  }

  updateFavorites(){
    let favs = this.favorites.getValue();
    let votes = this.votes.getValue();

      favs.map((img, id, arr)=>{
        img.favorited = true;

        //set a vote objet on top of the object so that it can update its status in the view

        let vote = votes[img.image_id];
        console.log( vote)
        if ( vote ){
         img.vote = {value: vote.value, id: vote.id};
        }
      });
      this.favorites.next(favs)

      this.cd.detectChanges()
      //console.log( favs)

  }
}

