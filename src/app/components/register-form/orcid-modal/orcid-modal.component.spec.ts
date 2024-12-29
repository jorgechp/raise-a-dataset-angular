import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrcidModalComponent} from './orcid-modal.component';

describe('OrcidModalComponent', () => {
  let component: OrcidModalComponent;
  let fixture: ComponentFixture<OrcidModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcidModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrcidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
