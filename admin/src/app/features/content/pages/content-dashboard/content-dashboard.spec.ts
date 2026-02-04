import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDashboard } from './content-dashboard';

describe('ContentDashboard', () => {
  let component: ContentDashboard;
  let fixture: ComponentFixture<ContentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
