export enum SageScopes {
    Readonly = "readonly",
    FullAccess = "full_access"
}

export enum SageSupportedCountries {
    Canada = "ca",
    Germany = "de",
    Spain = "es",
    France = "fr",
    UK = "gb",
    Ireland = "ie",
    US = "us"
}

export enum SageLocales {
    EnglishCA = "en-CA",
    FrenchCA = "fr-CA",
    German = "de-DE",
    Spanish = "es-ES",
    French = "fr",
    EnglishUK = "en-GB",
    EnglishUS = "en-US",
    SpanishUS = "es-US"
}

export interface SageRedirectionModel {
    successUrl: string;
    errorUrl: string;
}

export interface SageConfigModel {
    clientId: string;
    clientSecret: string;
    scopes: SageScopes[];
    country: SageSupportedCountries;
    serverUri: string;
    redirection: SageRedirectionModel;
}

export class SageConfigModel {
    public clientId: string;
    public clientSecret: string;
    public scopes: SageScopes[];
    public country: SageSupportedCountries;
    public redirection: SageRedirectionModel;
    public serverUri: string;

    constructor(config: Partial<SageConfigModel>) {
        this.clientId = config.clientId ?? process.env.SAGE_CLIENT_ID;
        this.clientSecret = config.clientSecret ?? process.env.SAGE_CLIENT_SECRET;
        this.scopes = config.scopes ?? process.env.SAGE_CLIENT_SCOPES.split(" ") as SageScopes[];
        this.country = config.country ?? process.env.SAGE_COUNTRY as SageSupportedCountries;
        this.serverUri = config.serverUri ?? process.env.SAGE_SERVER_URI;
        this.redirection = config.redirection ?? {
            successUrl: process.env.SAGE_REDIRECT_SUCCESS,
            errorUrl: process.env.SAGE_REDIRECT_ERROR
        };
    }

    public getQueryParams(): { [key: string]: string | string[] } {
        const query = {
            filter: "apiv3.1"
        };

        if (this.country) {
            query["country"] = this.country;
        }

        return query;
    }
}
