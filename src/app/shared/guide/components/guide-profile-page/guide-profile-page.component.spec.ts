import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProfilePageComponent } from './guide-profile-page.component';

describe('GuideProfilePageComponent', () => {
  let component: GuideProfilePageComponent;
  let fixture: ComponentFixture<GuideProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
