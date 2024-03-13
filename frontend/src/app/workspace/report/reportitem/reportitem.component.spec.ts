import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportitemComponent } from './reportitem.component';

describe('ReportitemComponent', () => {
  let component: ReportitemComponent;
  let fixture: ComponentFixture<ReportitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
