import { Module } from "@nestjs/common";
import { SageConfigService } from "./services/sage-config.service";

@Module({
    providers: [SageConfigService],
    exports: [SageConfigService]
})
export class ConfigModule {}
