import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMonitorComponent } from './live-monitor.component';

describe('LiveMonitorComponent', () => {
  let component: LiveMonitorComponent;
  let fixture: ComponentFixture<LiveMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
