import { HttpService, Injectable } from "@nestjs/common";
import { Token } from "client-oauth2";
import * as OAuthClient from "client-oauth2";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map, mergeMap } from "rxjs/operators";
import { SageLocales } from "../../config";
import { SageConfigAuthModel } from "../../config/models/sage-config-auth.model";
import { SageConfigService } from "../../config/services/sage-config.service";
import { SageStore } from "../../store";

@Injectable()
export class SageAuthService {
    private readonly client: OAuthClient;

    constructor(
        private readonly httpClient: HttpService,
        private readonly configService: SageConfigService,
        private readonly tokenStore: SageStore
    ) {
        this.client = new OAuthClient({
            clientId: this.configService.global.clientId,
            clientSecret: this.configService.global.clientSecret,
            authorizationUri: SageConfigAuthModel.AuthorizationEndpoint,
            accessTokenUri: SageConfigAuthModel.TokenEndpoint,
            scopes: this.configService.global.scopes,
            state: "nestjs-sage",
            // query: this.configService.global.getQueryParams(),
            redirectUri: `${this.configService.global.serverUri}/sage/auth/return`
        });
    }

    public getAuthorizeUri(lang?: SageLocales): string {
        return this.client.code.getUri({
            query: {
                locale: lang
            }
        });
    }

    public async authorizeCode(url: string): Promise<void> {
        const token = await this.client.code.getToken(url);
        await this.tokenStore.setToken(token);
    }

    public getToken(): Observable<string> {
        return fromPromise(this.tokenStore.getToken()).pipe(
            mergeMap((token) => {
                if (!token) {
                    return of(null);
                }

                if (!token.expired()) {
                    return of(token.accessToken);
                }

                return this.refreshAccessToken(token);
            })
        );
    }

    private refreshAccessToken(token: Token): Observable<string> {
        return fromPromise(token.refresh()).pipe(
            map((newToken) => {
                this.tokenStore.setToken(newToken);
                return newToken.accessToken;
            })
        );
    }
}
