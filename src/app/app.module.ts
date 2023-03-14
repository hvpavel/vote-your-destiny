import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PollComponent } from './poll/poll.component';
import { pollReducer } from './state';
import { ChartModule } from './chart/chart.module';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    StoreModule.forRoot({ poll: pollReducer }),
    ChartModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
