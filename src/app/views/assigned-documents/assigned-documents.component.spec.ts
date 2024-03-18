import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDocumentsComponent } from './assigned-documents.component';

describe('AssignedDocumentsComponent', () => {
  let component: AssignedDocumentsComponent;
  let fixture: ComponentFixture<AssignedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
