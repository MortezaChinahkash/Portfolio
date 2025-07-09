import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPokedexComponent } from './project-pokedex.component';

describe('ProjectPokedexComponent', () => {
  let component: ProjectPokedexComponent;
  let fixture: ComponentFixture<ProjectPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPokedexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
