import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseActionsComponent } from './raise-actions.component';

describe('RaiseActionsComponent', () => {
  let component: RaiseActionsComponent;
  let fixture: ComponentFixture<RaiseActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaiseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
