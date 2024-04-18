import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDEComponent } from './update-de.component';

describe('UpdateDEComponent', () => {
  let component: UpdateDEComponent;
  let fixture: ComponentFixture<UpdateDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
