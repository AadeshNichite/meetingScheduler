import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddModaleComponent } from './event-add-modale.component';

describe('EventAddModaleComponent', () => {
  let component: EventAddModaleComponent;
  let fixture: ComponentFixture<EventAddModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAddModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
