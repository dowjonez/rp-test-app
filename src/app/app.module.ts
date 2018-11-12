import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { MediaCellComponent } from './components/media-cell/media-cell.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterPipe } from './pipes/filter.pipe';

import { ApiService } from './services/api.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavButtonComponent,
    MediaCellComponent,
    FilterComponent,
    FilterPipe,
    ProfileComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    BrowserModule, CommonModule, HttpClientModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
