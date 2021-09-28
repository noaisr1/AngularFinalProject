import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileTouristComponent } from './edit-profile-tourist.component';

describe('EditProfileTouristComponent', () => {
  let component: EditProfileTouristComponent;
  let fixture: ComponentFixture<EditProfileTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileTouristComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
