import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeDetailComponent } from './receipe-detail.component';

describe('ReceipeDetailComponent', () => {
  let component: ReceipeDetailComponent;
  let fixture: ComponentFixture<ReceipeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceipeDetailComponent]
    });
    fixture = TestBed.createComponent(ReceipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
