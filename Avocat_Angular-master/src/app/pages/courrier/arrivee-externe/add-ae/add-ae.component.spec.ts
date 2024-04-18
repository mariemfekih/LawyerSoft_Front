import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAeComponent } from './add-ae.component';

describe('AddAeComponent', () => {
  let component: AddAeComponent;
  let fixture: ComponentFixture<AddAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
