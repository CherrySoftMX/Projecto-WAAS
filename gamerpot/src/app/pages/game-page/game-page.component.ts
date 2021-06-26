import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/shared/modal-qr-code/modal-qr-code.component';
import { GameDetails } from '../../_models/game-details';
import { DealsService } from '../../_services/deals-service.service';
import { GameDatailsService } from '../../_services/game-details.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  gameDetails: GameDetails = {} as GameDetails;
  commentaries: Array<any> = [];
  fetching: boolean = true;
  gameDeals: any = [];

  constructor(
    private gameDetailsService: GameDatailsService,
    private route: ActivatedRoute,
    private dealsService: DealsService,
    public modalService: NgbModal
  ) {}

  ngOnInit() {
    this.fetching = true;
    const id = this.route.snapshot.params.id;
    this.fetchGameDetails(id).then(() => {
      this.fetching = false;
    });
  }

  fetchGameDetails = async (id: number) => {
    this.gameDetails = await this.gameDetailsService.fetchGameDetails(id);
    this.fetchGameDeals();
  };

  fetchGameDeals = async () => {
    this.gameDeals = await this.dealsService
      .buildUrl({ title: this.gameDetails.name, maxResults: 10 })
      .fetchDealsByGameName();
  };

  displayMore(): void {
    const more = document.getElementById('more');
    const moreBtn = document.getElementById('more-btn');
    const dots = document.getElementById('dots');

    if (more && moreBtn && dots) {
      if (document.getElementById('more')?.style.display == 'none') {
        more.style.display = 'inline';
        moreBtn.innerHTML = 'Show less';
        dots.style.display = 'none';
      } else {
        more.style.display = 'none';
        moreBtn.innerHTML = 'See more';
        dots.style.display = 'inline';
      }
    }
  }

  setMetacriticState(): any {
    const metacritic = this.gameDetails.metacritic;

    const nm = metacritic == null;
    const lm = metacritic <= 30;
    const mm = metacritic > 30 && metacritic < 70;
    const hm = metacritic >= 70;

    let classes = {
      'no-metacritic': nm,
      'metacritic-low': lm,
      'metacritic-medium': mm,
      'metacritic-high': hm,
    };

    return classes;
  }

  addToWishlist(): void {
    console.log('game added');
  }

  showQRCode = () => {
    const activeModal = this.modalService.open(ModalComponent, {
      centered: true,
      windowClass: 'modal-rounded',
      size: 'lg',
    });
    activeModal.componentInstance.title = 'Codigo QR';
    activeModal.componentInstance.url = location.href;
  };
}
