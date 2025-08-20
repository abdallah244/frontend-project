import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductDetails } from './admin-product-details';

describe('AdminProductDetails', () => {
  let component: AdminProductDetails;
  let fixture: ComponentFixture<AdminProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
