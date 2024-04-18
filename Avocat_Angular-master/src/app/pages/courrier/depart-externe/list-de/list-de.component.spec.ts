import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDEComponent } from './list-de.component';

describe('ListDEComponent', () => {
  let component: ListDEComponent;
  let fixture: ComponentFixture<ListDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
