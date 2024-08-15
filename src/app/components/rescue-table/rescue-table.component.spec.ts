import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RescueTableComponent} from './rescue-table.component';

describe('RescueTableComponent', () => {
  let component: RescueTableComponent;
  let fixture: ComponentFixture<RescueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescueTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RescueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
