import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projeto } from './projetos';

describe('Projeto', () => {
  let component: Projeto;
  let fixture: ComponentFixture<Projeto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projeto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projeto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
