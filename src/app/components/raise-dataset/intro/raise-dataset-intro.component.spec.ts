import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RaiseDatasetIntroComponent} from './raise-dataset-intro.component';

describe('RaiseDatasetIntroComponent', () => {
  let component: RaiseDatasetIntroComponent;
  let fixture: ComponentFixture<RaiseDatasetIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseDatasetIntroComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RaiseDatasetIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
