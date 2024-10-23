import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { secretWord } from "./auth.module";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>){
        super({
            secretOrKey: `${secretWord}`,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    };

    async validate(payload: JwtPayload): Promise<User> {
        const {email} = payload;
        const user: User = await this.userModel.findOne({email}).select('-password');

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}