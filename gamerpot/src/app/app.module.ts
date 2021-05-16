import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealTableRowComponent } from './components/deals/deal-table-row/deal-table-row.component';
import { DealsTableComponent } from './components/deals/deals-table/deals-table.component';
import { PriceRangeComponent } from './components/deals/price-range/price-range.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SearchBoxComponent } from './components/shared/search-box/search-box.component';
import { TitleWithContentComponent } from './components/shared/title-with-content/title-with-content.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { DealsService } from './services/deals-service.service';
import { StoresService } from './services/stores-service.service';

@NgModule({
  declarations: [
    AppComponent,
    DealsPageComponent,
    SearchBoxComponent,
    PriceRangeComponent,
    TitleWithContentComponent,
    NavbarComponent,
    DealsTableComponent,
    DealTableRowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [DealsService, StoresService],
  bootstrap: [AppComponent],
})
export class AppModule {}
