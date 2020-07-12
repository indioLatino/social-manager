import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSpaceComponent } from './personal-space.component';

describe('PersonalSpaceComponent', () => {
  let component: PersonalSpaceComponent;
  let fixture: ComponentFixture<PersonalSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
