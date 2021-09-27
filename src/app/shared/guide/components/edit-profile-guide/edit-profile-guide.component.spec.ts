import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileGuideComponent } from './edit-profile-guide.component';

describe('EditProfileGuideComponent', () => {
  let component: EditProfileGuideComponent;
  let fixture: ComponentFixture<EditProfileGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
