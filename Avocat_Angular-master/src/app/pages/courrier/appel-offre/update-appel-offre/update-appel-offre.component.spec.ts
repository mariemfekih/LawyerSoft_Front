import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppelOffreComponent } from './update-appel-offre.component';

describe('UpdateAppelOffreComponent', () => {
  let component: UpdateAppelOffreComponent;
  let fixture: ComponentFixture<UpdateAppelOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppelOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAppelOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
