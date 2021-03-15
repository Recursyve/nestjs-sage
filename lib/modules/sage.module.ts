import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import { GLOBAL_CONFIG } from "../constants";
import { SageAuthModule } from "./auth/auth.module";
import { SageConfigModel } from "./config";
import { SageStore } from "./store";
import { LocalStore } from "./store/local.store";

export interface SageOptions extends Pick<ModuleMetadata, "imports"> {
    config?: Partial<SageConfigModel>;
    store?: Provider;
}

@Global()
@Module({})
export class SageModule {
    public static forRoot(options?: SageOptions): DynamicModule {
        if (!options.store) {
            options.store = {
                provide: SageStore,
                useClass: LocalStore
            };
        }

        return {
            module: SageModule,
            imports: [SageAuthModule, ...(options.imports ?? [])],
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: new SageConfigModel(options.config)
                },
                options.store
            ],
            exports: [GLOBAL_CONFIG, SageStore]
        };
    }
}
