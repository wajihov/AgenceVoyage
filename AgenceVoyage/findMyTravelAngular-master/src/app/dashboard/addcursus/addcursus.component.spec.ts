import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcursusComponent } from './addcursus.component';

describe('AddcursusComponent', () => {
  let component: AddcursusComponent;
  let fixture: ComponentFixture<AddcursusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcursusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
