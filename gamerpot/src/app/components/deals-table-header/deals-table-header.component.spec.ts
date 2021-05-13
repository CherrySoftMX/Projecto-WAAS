import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsTableHeaderComponent } from './deals-table-header.component';

describe('DealsTableHeaderComponent', () => {
  let component: DealsTableHeaderComponent;
  let fixture: ComponentFixture<DealsTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsTableHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
