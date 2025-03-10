import {AutofillMonitor} from '@angular/cdk/text-field';
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Monitoring autofill state with AutofillMonitor */
@Component({
  selector: 'text-field-autofill-monitor-example',
  templateUrl: './text-field-autofill-monitor-example.html',
  styleUrl: './text-field-autofill-monitor-example.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class TextFieldAutofillMonitorExample implements AfterViewInit, OnDestroy {
  @ViewChild('first', {read: ElementRef}) firstName: ElementRef<HTMLElement>;
  @ViewChild('last', {read: ElementRef}) lastName: ElementRef<HTMLElement>;
  firstNameAutofilled: boolean;
  lastNameAutofilled: boolean;

  constructor(private _autofill: AutofillMonitor) {}

  ngAfterViewInit() {
    this._autofill
      .monitor(this.firstName)
      .subscribe(e => (this.firstNameAutofilled = e.isAutofilled));
    this._autofill
      .monitor(this.lastName)
      .subscribe(e => (this.lastNameAutofilled = e.isAutofilled));
  }

  ngOnDestroy() {
    this._autofill.stopMonitoring(this.firstName);
    this._autofill.stopMonitoring(this.lastName);
  }
}
