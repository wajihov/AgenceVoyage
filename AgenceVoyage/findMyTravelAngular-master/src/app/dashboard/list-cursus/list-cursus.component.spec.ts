import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCursusComponent } from './list-cursus.component';

describe('ListCursusComponent', () => {
  let component: ListCursusComponent;
  let fixture: ComponentFixture<ListCursusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCursusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
