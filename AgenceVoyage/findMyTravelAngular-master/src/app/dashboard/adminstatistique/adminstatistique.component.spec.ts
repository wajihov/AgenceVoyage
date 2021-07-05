import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstatistiqueComponent } from './adminstatistique.component';

describe('AdminstatistiqueComponent', () => {
  let component: AdminstatistiqueComponent;
  let fixture: ComponentFixture<AdminstatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
