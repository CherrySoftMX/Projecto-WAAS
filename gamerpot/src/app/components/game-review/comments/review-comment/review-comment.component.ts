import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Comment } from '../../../../_models/comment';
import { MAX_COMMENT_LENGTH } from '../leave-comment/leave-comment.component';

@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.component.html',
  styleUrls: ['./review-comment.component.css'],
})
export class ReviewCommentComponent implements OnInit {
  editingComment = false;
  commentContentSnapshot = '';
  maxCommentLength = MAX_COMMENT_LENGTH;

  @Input() loggedUser: User | null = null;
  @Input() comment: Comment = {} as Comment;

  @Output() onDeleteComment = new EventEmitter<Comment>();
  @Output() onUpdateComment = new EventEmitter<Comment>();

  constructor() {}

  ngOnInit(): void {}

  deleteComment() {
    this.onDeleteComment.emit(this.comment);
  }

  editComment() {
    this.editingComment = true;
    this.commentContentSnapshot = this.comment.content;
  }

  updateComment(content: string) {
    if (!this.isValidComment(content)) return;

    this.onUpdateComment.emit(this.comment);
    this.editingComment = false;
  }

  cancelUpdateComment() {
    this.editingComment = false;
    this.comment.content = this.commentContentSnapshot;
  }

  isValidComment(content: string) {
    return !!content && content.length <= MAX_COMMENT_LENGTH;
  }
}
