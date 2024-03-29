import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EagleInfoComponent } from './eagle-info.component';

describe('EagleInfoComponent', () => {
  let component: EagleInfoComponent;
  let fixture: ComponentFixture<EagleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EagleInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EagleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
