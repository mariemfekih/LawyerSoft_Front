import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAeComponent } from './list-ae.component';

describe('ListAeComponent', () => {
  let component: ListAeComponent;
  let fixture: ComponentFixture<ListAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
