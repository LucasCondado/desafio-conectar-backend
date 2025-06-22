import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirectToApi(@Res() res: Response) {
    return res.redirect('/api');
  }
}