import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmtpComponent } from './add-smtp.component';

describe('AddSmtpComponent', () => {
  let component: AddSmtpComponent;
  let fixture: ComponentFixture<AddSmtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
