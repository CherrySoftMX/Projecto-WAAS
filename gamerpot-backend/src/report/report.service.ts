import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { CommentService } from 'src/games/services/comment.service';
import { UserRole } from 'src/user/entities/user-role';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ReportService {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  async getAllComments() {
    const pdfBuilder = await new Promise<Buffer>(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      const comments = await this.commentService.getAllComments();

      this.setUpTitle(doc, 'All comments');

      comments.forEach((comment) => {
        this.renderField(doc, 'userId', comment.user.userId);
        this.renderField(doc, 'name', comment.user.name);
        this.renderField(doc, 'email', comment.user.email);
        this.renderField(doc, 'gameId', comment.game.gameId);
        this.renderField(doc, 'commentId', comment.commentId);
        this.renderField(doc, 'content', comment.content);
        this.renderBottomLine(doc);
      });

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuilder;
  }

  async getAllUsers() {
    const pdfBuilder = await new Promise<Buffer>(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      const users = await this.userService.getAllUsers();

      this.setUpTitle(doc, 'All users');

      users.forEach((user) => {
        this.renderField(doc, 'userId', user.userId);
        this.renderField(doc, 'name', user.name);
        this.renderField(doc, 'email', user.email);
        this.renderField(doc, 'role', UserRole[user.role].toString());
        this.renderBottomLine(doc);
      });

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuilder;
  }

  private setUpTitle(doc: PDFKit.PDFDocument, title: string) {
    doc.fontSize(30);
    doc.text(title);
    doc.fontSize(12);
  }

  private renderField(
    doc: PDFKit.PDFDocument,
    fieldName: string,
    fieldValue: any,
  ) {
    doc.font('Helvetica-Bold');
    doc.text(`${fieldName}: `, { continued: true });
    doc.font('Helvetica');
    doc.text(`${fieldValue}`);
    doc.moveDown();
  }

  private renderBottomLine(doc: PDFKit.PDFDocument) {
    doc
      .lineCap('butt')
      .moveTo(80, doc.y)
      .lineTo(doc.page.width - 80, doc.y)
      .stroke();
    doc.y += 20;
  }
}
