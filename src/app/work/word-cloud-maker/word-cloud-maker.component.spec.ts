import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudMakerComponent } from './word-cloud-maker.component';

describe('WordCloudMakerComponent', () => {
  let component: WordCloudMakerComponent;
  let fixture: ComponentFixture<WordCloudMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCloudMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCloudMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
