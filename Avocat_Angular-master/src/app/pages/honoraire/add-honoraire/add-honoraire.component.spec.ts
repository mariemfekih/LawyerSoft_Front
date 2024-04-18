import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHonoraireComponent } from './add-honoraire.component';

describe('AddHonoraireComponent', () => {
  let component: AddHonoraireComponent;
  let fixture: ComponentFixture<AddHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHonoraireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
