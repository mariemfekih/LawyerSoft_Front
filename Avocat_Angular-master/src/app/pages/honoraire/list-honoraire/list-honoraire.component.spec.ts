import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHonoraireComponent } from './list-honoraire.component';

describe('ListHonoraireComponent', () => {
  let component: ListHonoraireComponent;
  let fixture: ComponentFixture<ListHonoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHonoraireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHonoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
