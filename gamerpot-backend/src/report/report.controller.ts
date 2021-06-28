import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/roles/role.decorator';
import { UserRole } from 'src/user/entities/user-role';
import { ReportService } from './report.service';

@Controller('reports/')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('all-comments')
  @Roles(UserRole.ADMIN)
  async generateCommentsReport(@Res() res: Response) {
    const buffer = await this.reportService.getAllComments();
    this.sendResponse(res, buffer);
  }

  @Get('all-users')
  @Roles(UserRole.ADMIN)
  async generateUsersReport(@Res() res: Response) {
    const buffer = await this.reportService.getAllUsers();
    this.sendResponse(res, buffer);
  }

  private sendResponse(res: Response, buffer: Buffer) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
