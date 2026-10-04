import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationsComponent } from './violations.component';

describe('ViolationsComponent', () => {
  let component: ViolationsComponent;
  let fixture: ComponentFixture<ViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViolationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
