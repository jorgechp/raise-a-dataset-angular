import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericAdminComponent} from './generic-admin.component';

describe('GenericAdminComponent', () => {
  let component: GenericAdminComponent<any>;
  let fixture: ComponentFixture<GenericAdminComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenericAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
