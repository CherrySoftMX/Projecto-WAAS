import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { DealsRowComponent } from './components/deals-row/deals-row.component';
import { DealsTableHeaderComponent } from './components/deals-table-header/deals-table-header.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { TitleWithContentComponent } from './components/title-with-content/title-with-content.component';
import { DealsService } from './services/deals-service.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DealsPageComponent,
    DealsRowComponent,
    DealsTableHeaderComponent,
    SearchBoxComponent,
    PriceRangeComponent,
    TitleWithContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DealsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
