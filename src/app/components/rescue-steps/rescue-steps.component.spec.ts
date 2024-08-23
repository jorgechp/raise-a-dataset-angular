import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueStepsComponent } from './rescue-steps.component';

describe('RescueStepsComponent', () => {
  let component: RescueStepsComponent;
  let fixture: ComponentFixture<RescueStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescueStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescueStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
