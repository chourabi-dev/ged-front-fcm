import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermessionsComponent } from './edit-permessions.component';

describe('EditPermessionsComponent', () => {
  let component: EditPermessionsComponent;
  let fixture: ComponentFixture<EditPermessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPermessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
