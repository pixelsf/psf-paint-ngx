import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintCanvasComponent } from './paint-canvas.component';

describe('PaintCanvasComponent', () => {
  let component: PaintCanvasComponent;
  let fixture: ComponentFixture<PaintCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
