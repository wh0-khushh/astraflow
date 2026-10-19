import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
