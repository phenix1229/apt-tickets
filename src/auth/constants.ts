import { ConfigService, ConfigModule } from "@nestjs/config"

export const jwtConstants = {
    // secret: {
    //     inject: [ConfigService], 
    // useFactory: async (configSecret: ConfigService) => ({
    // secret: configSecret.get("SECRET")
    // })}
    secret:"thisSucks"
}