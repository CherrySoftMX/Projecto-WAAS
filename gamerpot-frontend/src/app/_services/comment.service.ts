import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';

const BASE_URL = `${environment.apiUrl}/games`;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  fetchComments(gameId: number) {
    return this.http
      .get<Comment[]>(`${BASE_URL}/${gameId}/comments`)
      .toPromise();
  }

  createComment(gameId: number, content: string) {
    return this.http
      .post<Comment>(`${BASE_URL}/${gameId}/comments`, {
        content,
      })
      .toPromise();
  }

  updateComment(gameId: number, comment: Comment) {
    return this.http
      .put<Comment>(`${BASE_URL}/${gameId}/comments/${comment.commentId}`, {
        content: comment.content,
      })
      .toPromise();
  }

  deleteComment(gameId: number, comment: Comment) {
    return this.http
      .delete<Comment>(`${BASE_URL}/${gameId}/comments/${comment.commentId}`)
      .toPromise();
  }
}
