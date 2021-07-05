import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistcompanyComponent } from './adminlistcompany.component';

describe('AdminlistcompanyComponent', () => {
  let component: AdminlistcompanyComponent;
  let fixture: ComponentFixture<AdminlistcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlistcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
