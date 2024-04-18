import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArrAeroportComponent } from './list-arr-aeroport.component';

describe('ListArrAeroportComponent', () => {
  let component: ListArrAeroportComponent;
  let fixture: ComponentFixture<ListArrAeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArrAeroportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArrAeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
