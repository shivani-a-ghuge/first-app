import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeStartComponent } from './receipe-start.component';

describe('ReceipeStartComponent', () => {
  let component: ReceipeStartComponent;
  let fixture: ComponentFixture<ReceipeStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceipeStartComponent]
    });
    fixture = TestBed.createComponent(ReceipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
