import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { DealsRowComponent } from './components/deals-row/deals-row.component';
import { DealsTableHeaderComponent } from './components/deals-table-header/deals-table-header.component';

@NgModule({
  declarations: [
    AppComponent,
    DealsPageComponent,
    DealsRowComponent,
    DealsTableHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
