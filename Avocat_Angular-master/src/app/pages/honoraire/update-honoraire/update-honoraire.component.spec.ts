import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHonoraireComponent } from './update-honoraire.component';

describe('UpdateHonoraireComponent', () => {
  let component: UpdateHonoraireComponent;
  let fixture: ComponentFixture<UpdateHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHonoraireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
