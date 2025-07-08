import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // Import standalone App component
    }).compileComponents();

    fixture = TestBed.createComponent(App); // Create component fixture
  });

  // Test: App component should be created successfully
  it('should create the app', () => {
    const app = fixture.componentInstance; // get the component instance
    expect(app).toBeTruthy();
  });

  // Test: Should render <router-outlet> in template
  it('should render a router-outlet', () => {
    fixture.detectChanges(); // trigger change detection to render the template
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  }); 
});