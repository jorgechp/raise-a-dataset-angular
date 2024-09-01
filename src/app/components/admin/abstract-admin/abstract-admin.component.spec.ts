import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AbstractAdminComponent} from './abstract-admin.component';

describe('AbstractAdminComponent', () => {
  let component: AbstractAdminComponent;
  let fixture: ComponentFixture<AbstractAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AbstractAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
