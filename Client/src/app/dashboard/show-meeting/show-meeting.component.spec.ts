import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMeetingComponent } from './show-meeting.component';

describe('ShowMeetingComponent', () => {
  let component: ShowMeetingComponent;
  let fixture: ComponentFixture<ShowMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
