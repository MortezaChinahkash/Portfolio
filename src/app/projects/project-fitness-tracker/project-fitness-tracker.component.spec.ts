import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFitnessTrackerComponent } from './project-fitness-tracker.component';

describe('ProjectFitnessTrackerComponent', () => {
  let component: ProjectFitnessTrackerComponent;
  let fixture: ComponentFixture<ProjectFitnessTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFitnessTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFitnessTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
