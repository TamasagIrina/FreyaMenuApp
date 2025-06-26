import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProductDetailsComponent } from './pop-up-product-details.component';

describe('PopUpProductDetailsComponent', () => {
  let component: PopUpProductDetailsComponent;
  let fixture: ComponentFixture<PopUpProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProductDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
