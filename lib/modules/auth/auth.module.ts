import { HttpModule, Module } from "@nestjs/common";
import { SageAuthService } from "./services/auth.service";
import { ConfigModule } from "../config/config.module";
import { SageAuthController } from "./controllers/auth.controller";

@Module({
    imports: [ConfigModule, HttpModule],
    controllers: [SageAuthController],
    providers: [SageAuthService],
    exports: [SageAuthService]
})
export class SageAuthModule {}
