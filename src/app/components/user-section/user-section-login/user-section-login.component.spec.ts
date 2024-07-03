import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSectionLoginComponent} from './user-section-login.component';

describe('UserSectionLoginComponent', () => {
  let component: UserSectionLoginComponent;
  let fixture: ComponentFixture<UserSectionLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSectionLoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSectionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
