import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRecommendationComponent } from './survey-recommendation.component';

describe('SurveyRecommendationComponent', () => {
  let component: SurveyRecommendationComponent;
  let fixture: ComponentFixture<SurveyRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
