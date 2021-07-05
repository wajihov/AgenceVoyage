import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistclientComponent } from './adminlistclient.component';

describe('AdminlistclientComponent', () => {
  let component: AdminlistclientComponent;
  let fixture: ComponentFixture<AdminlistclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlistclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
