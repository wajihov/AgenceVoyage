import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistpublicationComponent } from './adminlistpublication.component';

describe('AdminlistpublicationComponent', () => {
  let component: AdminlistpublicationComponent;
  let fixture: ComponentFixture<AdminlistpublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlistpublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistpublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
