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
         votes[ img.image_id ] = img
       })
       return [res[0], res[1], votes];
     })
   ).subscribe(res=>{
      this.votes = new BehaviorSubject( res[2] )
      this.favorites = new BehaviorSubject( res[1] )
   })
       
   
  }

  navigate( test ){
    this.currentView = test.navigate;
  }

  onAction($event){
    if($event.value != null ){
      
      let votes =  this.votes.getValue()
      votes[$event.image_id] = $event
      this.votes.next( votes )
      this.cd.detectChanges();
    }
  }
}

