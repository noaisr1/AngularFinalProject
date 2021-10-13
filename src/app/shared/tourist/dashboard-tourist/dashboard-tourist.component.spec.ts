import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTouristComponent } from './dashboard-tourist.component';

describe('DashboardTouristComponent', () => {
  let component: DashboardTouristComponent;
  let fixture: ComponentFixture<DashboardTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTouristComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
