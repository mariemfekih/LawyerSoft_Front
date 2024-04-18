import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrAeroportComponent } from './add-arr-aeroport.component';

describe('AddArrAeroportComponent', () => {
  let component: AddArrAeroportComponent;
  let fixture: ComponentFixture<AddArrAeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrAeroportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrAeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
