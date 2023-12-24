import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThousandSuffixesPipe } from './pipes/thousand_suffixes_pipe.pipe';
import { DateFormatPipe } from './pipes/date_format.pipe';



@NgModule({
  imports: [],
  declarations: [
    DateFormatPipe,
    ThousandSuffixesPipe,],
  exports: [ThousandSuffixesPipe, DateFormatPipe],
})
export class SharedAppModule { }
