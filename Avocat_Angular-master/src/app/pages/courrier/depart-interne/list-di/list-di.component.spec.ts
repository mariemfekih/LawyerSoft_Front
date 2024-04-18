import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiComponent } from './list-di.component';

describe('ListDiComponent', () => {
  let component: ListDiComponent;
  let fixture: ComponentFixture<ListDiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
