import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDEComponent } from './add-de.component';

describe('AddDEComponent', () => {
  let component: AddDEComponent;
  let fixture: ComponentFixture<AddDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
