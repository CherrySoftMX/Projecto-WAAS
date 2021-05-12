import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsRowComponent } from './deals-row.component';

describe('DealsRowComponent', () => {
  let component: DealsRowComponent;
  let fixture: ComponentFixture<DealsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
