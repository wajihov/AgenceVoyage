import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistcursusComponent } from './adminlistcursus.component';

describe('AdminlistcursusComponent', () => {
  let component: AdminlistcursusComponent;
  let fixture: ComponentFixture<AdminlistcursusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlistcursusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistcursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
