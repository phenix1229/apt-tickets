import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService, private configService: ConfigService) {}

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
        ]);
        if (!requiredRoles) {
        return true;
        }
        const accessToken = context.switchToHttp().getRequest().headers.authorization.replace('Bearer ','');
        const user = this.jwtService.verify(accessToken,{secret:this.configService.get('JWT_ACCESS_TOKEN_SECRET')});
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}