import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { SortablejsModule } from 'angular-sortablejs';
import { TextMaskModule } from 'angular2-text-mask';


import { todoReducer } from './reducer/reducers';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FullTodo} from "./fullTodo/fullTodo";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
      FullTodo
  ],
  imports: [
      StoreModule.forRoot( {todoReducer} ),
      StoreDevtoolsModule.instrument(),
      FormsModule,
      BrowserModule.withServerTransition({appId: 'my-app'}),
      BrowserAnimationsModule,
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatButtonModule,
      MatTooltipModule,
      MatIconModule,
      TextMaskModule,
      MatNativeDateModule,
      SortablejsModule.forRoot({ animation: 150 })

  ],
    exports: [MatInputModule, MatFormFieldModule, MatDatepickerModule,MatNativeDateModule, MatButtonModule, MatIconModule, MatTooltipModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
