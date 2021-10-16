import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTouristComponent } from './nav-bar-tourist.component';

describe('NavBarTouristComponent', () => {
  let component: NavBarTouristComponent;
  let fixture: ComponentFixture<NavBarTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarTouristComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
