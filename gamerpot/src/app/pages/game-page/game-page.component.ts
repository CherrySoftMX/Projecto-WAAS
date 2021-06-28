import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MAX_COMMENT_LENGTH } from 'src/app/components/game-review/comments/leave-comment/leave-comment.component';
import { ModalQRCodeComponent } from 'src/app/components/shared/modal-qr-code/modal-qr-code.component';
import { Deal } from 'src/app/_models/deal';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from 'src/app/_services/comment.service';
import { WishlistService } from 'src/app/_services/wishlist.service';
import { Comment } from '../../_models/comment';
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
  comments: Comment[] = [];

  fetchingGame = true;
  togglingFromWishlist = false;

  gameDeals: Deal[] = [];

  constructor(
    public authService: AuthService,
    private gameDetailsService: GameDatailsService,
    private route: ActivatedRoute,
    private dealsService: DealsService,
    public modalService: NgbModal,
    private commentService: CommentService,
    private wishlist: WishlistService
  ) {}

  async ngOnInit() {
    this.fetchingGame = true;
    const id = this.route.snapshot.params.id;

    await this.fetchGameDetails(id);
    await this.fetchGameDeals();
    await this.fetchComments();

    this.fetchingGame = false;
  }

  async fetchGameDetails(id: number) {
    this.gameDetails = await this.gameDetailsService.fetchGameDetails(id);
  }

  async fetchGameDeals() {
    this.gameDeals = await this.dealsService
      .buildUrl({ title: this.gameDetails.name, maxResults: 10 })
      .fetchDealsByGameName();
  }

  async fetchComments() {
    this.comments = await this.commentService.fetchComments(
      this.gameDetails.id
    );
  }

  addToWishlist() {
    this.authService.checkIfUserIsLogged();

    this.togglingFromWishlist = true;

    this.wishlist.toggleSave(this.gameDetails).finally(() => {
      this.togglingFromWishlist = false;
    });
  }

  publishComment(commentContent: string) {
    if (!commentContent || commentContent.length > MAX_COMMENT_LENGTH) return;

    this.commentService
      .createComment(this.gameDetails.id, commentContent)
      .then((result) => {
        this.comments.unshift(result);
      });
  }

  updateComment(comment: Comment) {
    this.commentService.updateComment(this.gameDetails.id, comment);
  }

  deleteComment(comment: Comment) {
    if (window.confirm('Are you sure?'))
      this.commentService
        .deleteComment(this.gameDetails.id, comment)
        .then((deletedComment) => {
          this.comments = this.comments.filter(
            (comment) => comment.commentId !== deletedComment.commentId
          );
        });
  }

  setMetacriticState() {
    const metacritic = this.gameDetails.metacritic;

    return {
      'no-metacritic': metacritic == null,
      'metacritic-low': metacritic <= 30,
      'metacritic-medium': metacritic > 30 && metacritic < 70,
      'metacritic-high': metacritic >= 70,
    };
  }

  displayMore() {
    const more = document.getElementById('more');
    const moreBtn = document.getElementById('more-btn');
    const dots = document.getElementById('dots');

    if (more && moreBtn && dots) {
      if (document.getElementById('more')?.style.display == 'none') {
        more.style.display = 'inline';
        dots.style.display = 'none';
        moreBtn.innerHTML = 'Show less';
      } else {
        more.style.display = 'none';
        dots.style.display = 'inline';
        moreBtn.innerHTML = 'See more';
      }
    }
  }

  showQRCode() {
    const activeModal = this.modalService.open(ModalQRCodeComponent, {
      centered: true,
      windowClass: 'modal-rounded',
      size: 'lg',
    });
    activeModal.componentInstance.title = 'QR Code';
    activeModal.componentInstance.url = location.href;
  }
}
