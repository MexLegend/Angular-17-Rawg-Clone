import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractGamesPageComponent } from './abstract-games-page.component';

describe('AbstractGamesPageComponent', () => {
  let component: AbstractGamesPageComponent;
  let fixture: ComponentFixture<AbstractGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractGamesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbstractGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
