import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminInstancesComponent} from './admin-instances.component';

describe('AdminInstancesComponent', () => {
  let component: AdminInstancesComponent;
  let fixture: ComponentFixture<AdminInstancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInstancesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
