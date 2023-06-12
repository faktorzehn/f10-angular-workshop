import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;
  let element: HTMLElement;
  const LABEL = 'LABEL';
  const ERROR = 'ERROR';
  const INPUT_ID = 'INPUT_ID';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldComponent]
    });
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should display label and error and have a "for" attribute', () => {
    component.label = LABEL;
    component.error = ERROR;
    component.inputId = INPUT_ID;

    fixture.detectChanges();

    expect(element.getElementsByTagName('label')[0].textContent?.trim()).toBe(LABEL);
    expect(element.getElementsByTagName('label')[0].attributes.getNamedItem('for')?.value).toBe(INPUT_ID);
    expect(element.getElementsByClassName('error')[0].textContent?.trim()).toBe(ERROR);
  });
});
