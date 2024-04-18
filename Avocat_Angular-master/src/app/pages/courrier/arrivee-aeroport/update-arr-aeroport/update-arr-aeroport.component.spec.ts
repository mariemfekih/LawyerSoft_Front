import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArrAeroportComponent } from './update-arr-aeroport.component';

describe('UpdateArrAeroportComponent', () => {
  let component: UpdateArrAeroportComponent;
  let fixture: ComponentFixture<UpdateArrAeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArrAeroportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArrAeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
