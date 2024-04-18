import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiComponent } from './add-di.component';

describe('AddDiComponent', () => {
  let component: AddDiComponent;
  let fixture: ComponentFixture<AddDiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
