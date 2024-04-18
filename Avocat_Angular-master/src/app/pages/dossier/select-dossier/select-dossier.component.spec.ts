import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDossierComponent } from './select-dossier.component';

describe('SelectDossierComponent', () => {
  let component: SelectDossierComponent;
  let fixture: ComponentFixture<SelectDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
