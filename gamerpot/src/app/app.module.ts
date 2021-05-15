import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealsRowComponent } from './components/deals-row/deals-row.component';
import { DealsTableHeaderComponent } from './components/deals-table-header/deals-table-header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { TitleWithContentComponent } from './components/title-with-content/title-with-content.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DealsPageComponent,
    DealsRowComponent,
    DealsTableHeaderComponent,
    SearchBoxComponent,
    PriceRangeComponent,
    TitleWithContentComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
