import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppelOffreComponent } from './add-appel-offre.component';

describe('AddAppelOffreComponent', () => {
  let component: AddAppelOffreComponent;
  let fixture: ComponentFixture<AddAppelOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppelOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppelOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
