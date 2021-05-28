import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { DealTableRowMinimalComponent } from './components/deals/deal-table-row-minimal/deal-table-row-minimal.component';
import { DealTableRowComponent } from './components/deals/deal-table-row/deal-table-row.component';
import { DealsTableComponent } from './components/deals/deals-table/deals-table.component';
import { PriceRangeComponent } from './components/deals/price-range/price-range.component';
import { FooterComponent } from './components/footer/footer.component';
import { WriteCommentComponent } from './components/game-review/comments/leave-comment/leave-comment.component';
import { ReviewCommentComponent } from './components/game-review/comments/review-comment/review-comment.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { ComboBoxComponent } from './components/shared/combo-box/combo-box.component';
import { GameCardComponent } from './components/shared/game-card/game-card.component';
import { GameCardsContainerComponent } from './components/shared/game-cards-container/game-cards-container.component';
import { InputFieldComponent } from './components/shared/input-field/input-field.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ProfileImgComponent } from './components/shared/profile-img/profile-img.component';
import { RecentDealsListComponent } from './components/shared/recent-deals-list/recent-deals-list.component';
import { SearchBoxComponent } from './components/shared/search-box/search-box.component';
import { SubtitleComponent } from './components/shared/subtitle/subtitle.component';
import { TitleWithContentComponent } from './components/shared/title-with-content/title-with-content.component';
import { TitleComponent } from './components/shared/title/title.component';
import { AboutComponent } from './pages/about/about.component';
import { BestGamesPageComponent } from './pages/best-games-page/best-games-page.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { PluckPipe } from './pipes/pluck.pipe';
import { BestGamesService } from './services/best-games.service';
import { CurrencyConverterService } from './services/currency-converter.service';
import { DealsService } from './services/deals-service.service';
import { StoresService } from './services/stores-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginPageComponent,
    DealsPageComponent,
    SearchBoxComponent,
    PriceRangeComponent,
    TitleWithContentComponent,
    NavbarComponent,
    DealsTableComponent,
    DealTableRowComponent,
    ComboBoxComponent,
    InputFieldComponent,
    SubtitleComponent,
    WriteCommentComponent,
    ReviewCommentComponent,
    ProfileImgComponent,
    GamePageComponent,
    HomePageComponent,
    DealTableRowMinimalComponent,
    GameCardComponent,
    TitleComponent,
    PaginationComponent,
    BestGamesPageComponent,
    WishlistPageComponent,
    CarouselComponent,
    RecentDealsListComponent,
    GameCardsContainerComponent,
    LoadingSpinnerComponent,
    NotFoundPageComponent,
    PluckPipe,
    AboutComponent,
    FooterComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DealsService,
    StoresService,
    CurrencyConverterService,
    BestGamesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
