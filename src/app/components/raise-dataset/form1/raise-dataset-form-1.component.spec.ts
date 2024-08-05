import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {RaiseDatasetForm1Component} from './raise-dataset-form-1.component';

describe('RaiseDatasetForm1Component', () => {
  let component: RaiseDatasetForm1Component;
  let fixture: ComponentFixture<RaiseDatasetForm1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseDatasetForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
