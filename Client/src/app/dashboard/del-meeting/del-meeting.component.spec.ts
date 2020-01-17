import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelMeetingComponent } from './del-meeting.component';

describe('DelMeetingComponent', () => {
  let component: DelMeetingComponent;
  let fixture: ComponentFixture<DelMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
