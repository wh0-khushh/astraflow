import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasComponent } from './cameras.component';

describe('CamerasComponent', () => {
  let component: CamerasComponent;
  let fixture: ComponentFixture<CamerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ CamerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
