import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectJoinComponent } from './project-join.component';

describe('ProjectJoinComponent', () => {
  let component: ProjectJoinComponent;
  let fixture: ComponentFixture<ProjectJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
