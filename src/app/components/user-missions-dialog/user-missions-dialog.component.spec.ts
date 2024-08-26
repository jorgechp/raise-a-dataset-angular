import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMissionsDialogComponent } from './user-missions-dialog.component';

describe('UserMissionsDialogComponent', () => {
  let component: UserMissionsDialogComponent;
  let fixture: ComponentFixture<UserMissionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMissionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
