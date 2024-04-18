import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAeComponent } from './update-ae.component';

describe('UpdateAeComponent', () => {
  let component: UpdateAeComponent;
  let fixture: ComponentFixture<UpdateAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
