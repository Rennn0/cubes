import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LibModule } from '@lib/lib.module';

import { AppComponent } from './app.component';
import { SplitterModule } from 'primeng/splitter';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SplitterModule,
    SkeletonModule,
    LibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
