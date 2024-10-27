import { Injectable, NestMiddleware } from "@nestjs/common";
const {expressjwt: jwt} = require('express-jwt');
import { expressJwtSecret } from "jwks-rsa";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService){}
    use(req: Request, res: Response, next: Function) {
        jwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${this.configService.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,

            }),
            issuer: `https://${this.configService.get('AUTH0_DOMAIN')}/`,
            algorithms: ['RS256']
        })(req, res, (err) => {
            if(err){
                const status = err.status || 500;
                const message = err.message || 'We are unable to process your request.';
                return res.status(status).send({message});
            }
            next();
        })
    }
}