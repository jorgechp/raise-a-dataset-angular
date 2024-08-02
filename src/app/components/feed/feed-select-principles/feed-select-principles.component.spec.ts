import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSelectPrinciplesComponent } from './feed-select-principles.component';

describe('FeedSelectPrinciplesComponent', () => {
  let component: FeedSelectPrinciplesComponent;
  let fixture: ComponentFixture<FeedSelectPrinciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedSelectPrinciplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedSelectPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
