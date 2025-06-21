import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Verifica se o usuário existe na requisição e se é admin
    if (!request.user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    
    if (request.user.role !== 'admin') {
      throw new UnauthorizedException('Acesso restrito a administradores');
    }
    
    return true;
  }
}