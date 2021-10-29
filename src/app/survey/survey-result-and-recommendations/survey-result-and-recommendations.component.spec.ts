import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultAndRecommendationsComponent } from './survey-result-and-recommendations.component';

describe('SurveyResultAndRecommendationsComponent', () => {
  let component: SurveyResultAndRecommendationsComponent;
  let fixture: ComponentFixture<SurveyResultAndRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultAndRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultAndRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
