import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairPrinciplesComponent } from './fair-principles.component';

describe('FairPrinciplesComponent', () => {
  let component: FairPrinciplesComponent;
  let fixture: ComponentFixture<FairPrinciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairPrinciplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
