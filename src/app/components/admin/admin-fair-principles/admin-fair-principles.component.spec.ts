import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminFairPrinciplesComponent} from './admin-fair-principles.component';

describe('AdminFairPrinciplesComponent', () => {
  let component: AdminFairPrinciplesComponent;
  let fixture: ComponentFixture<AdminFairPrinciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFairPrinciplesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminFairPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
