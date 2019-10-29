import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepdetailsComponent } from './stepdetails.component';

describe('StepdetailsComponent', () => {
  let component: StepdetailsComponent;
  let fixture: ComponentFixture<StepdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
