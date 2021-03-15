import { Module } from "@nestjs/common";
import { SageScopes, SageSupportedCountries } from "../../lib/modules/config";
import { SageModule } from "../../lib/modules/sage.module";

@Module({
    imports: [
        SageModule.forRoot({
            config: {
                country: SageSupportedCountries.Canada,
                serverUri: "https://dc690f78e013.ngrok.io",
                scopes: [SageScopes.FullAccess],
                redirection: {
                    successUrl: "http://localhost:3000/customer",
                    errorUrl: "http://localhost:3000/customer"
                }
            }
        })
    ],
    controllers: []
})
export class AppModule {}
