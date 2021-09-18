import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideHomePageComponent } from './guide-home-page.component';

describe('GuideHomePageComponent', () => {
  let component: GuideHomePageComponent;
  let fixture: ComponentFixture<GuideHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
