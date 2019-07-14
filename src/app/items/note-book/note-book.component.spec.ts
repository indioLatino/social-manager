import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBookComponent } from './note-book.component';

describe('NoteBookComponent', () => {
  let component: NoteBookComponent;
  let fixture: ComponentFixture<NoteBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
