import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedrecipesComponent } from './savedrecipes.component';

describe('SavedrecipesComponent', () => {
  let component: SavedrecipesComponent;
  let fixture: ComponentFixture<SavedrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedrecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
