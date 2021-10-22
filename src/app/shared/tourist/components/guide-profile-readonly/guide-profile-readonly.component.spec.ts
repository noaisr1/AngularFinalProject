import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProfileReadonlyComponent } from './guide-profile-readonly.component';

describe('GuideProfileReadonlyComponent', () => {
  let component: GuideProfileReadonlyComponent;
  let fixture: ComponentFixture<GuideProfileReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideProfileReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProfileReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
