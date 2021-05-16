import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DealsRowComponent } from './components/deals-row/deals-row.component';
import { DealsTableHeaderComponent } from './components/deals-table-header/deals-table-header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { TitleWithContentComponent } from './components/title-with-content/title-with-content.component';
import { DealsService } from './services/deals-service.service';
import { StoresService } from './services/stores-service.service';
import { HttpClientModule } from '@angular/common/http';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginPageComponent,
    DealsPageComponent,
    DealsRowComponent,
    DealsTableHeaderComponent,
    SearchBoxComponent,
    PriceRangeComponent,
    TitleWithContentComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [DealsService, StoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
