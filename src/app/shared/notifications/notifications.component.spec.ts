import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ NotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
