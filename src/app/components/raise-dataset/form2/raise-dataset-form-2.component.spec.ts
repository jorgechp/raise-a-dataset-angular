import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RaiseDatasetForm2Component} from './raise-dataset-form-2.component';

describe('RaiseDatasetForm2Component', () => {
  let component: RaiseDatasetForm2Component;
  let fixture: ComponentFixture<RaiseDatasetForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseDatasetForm2Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RaiseDatasetForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
