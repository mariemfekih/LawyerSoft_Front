import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiComponent } from './update-di.component';

describe('UpdateDiComponent', () => {
  let component: UpdateDiComponent;
  let fixture: ComponentFixture<UpdateDiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
