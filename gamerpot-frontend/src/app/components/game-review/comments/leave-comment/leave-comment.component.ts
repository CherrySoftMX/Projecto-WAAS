import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

export const MAX_COMMENT_LENGTH = 150;

@Component({
  selector: 'app-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.css'],
})
export class WriteCommentComponent implements OnInit, OnDestroy {
  user: User | null = null;
  maxCommentLength = MAX_COMMENT_LENGTH;
  userSubscription: Subscription;

  @Input() currentValue: string = '';

  @Output() onPublishComment = new EventEmitter<string>();

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  loginToLeaveComment() {
    this.authService.checkIfUserIsLogged();
  }

  onValueChanged(value: string) {
    this.currentValue = value;
  }

  publishComment() {
    this.onPublishComment.emit(this.currentValue);
    this.currentValue = '';
  }
}
