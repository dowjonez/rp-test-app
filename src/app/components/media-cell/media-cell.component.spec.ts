import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCellComponent } from './media-cell.component';

describe('MediaCellComponent', () => {
  let component: MediaCellComponent;
  let fixture: ComponentFixture<MediaCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
