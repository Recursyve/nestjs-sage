# Nest.js Sage

An easy way to interact with the Sages Cloud API in your NestJS applications.

## Features
- Authorization workflow

## Getting started

### Install

```
npm i --save @recursyve/nestjs-sage
```

### Import

```ts
import { SageModule, SageScopes } from "@recursyve/nestjs-sage";

@Module({
    imports: [
        SageModule.forRoot({
            config: {
                country: SageSupportedCountries.Canada,
                clientId: "clientId",
                clientSecret: "clientSecret",
                serverUri: "http://localhost:3000",
                scopes: [SageScopes.FullAccess],
                redirection: {
                    successUrl: "http://localhost:3000/customer",
                    errorUrl: "http://localhost:3000/customer"
                }
            }
        })
    ]
})
export class AppModule {}
```

### Configuration

You can set the config in the QuicksBooksModule forRoot function. You can also set the configuration with environment variable.

| **configuration**      | **Environment variable**    | **Definition**                              |
|------------------------|-----------------------------|---------------------------------------------|
| clientId               | SAGE_CLIENT_ID              | Your Sage application client id             |
| clientSecret           | SAGE_CLIENT_SECRET          | Your Sage application client secret         |
| scopes                 | SAGE_CLIENT_SCOPES          | Sage API scopes                             |
| serverUri              | SAGE_SERVER_URI             | Your NestJS application URI                 |
| redirection.successUrl | SAGE_REDIRECT_SUCCESS       | Redirection URL after authorization success |
| redirection.errorUrl   | SAGE_REDIRECT_ERROR         | Redirection URL after authorization error   |

### Authorization workflow

The Authorization workflow is embedded in the library. Two routes are provided.

- /sage/auth: Redirects to quickbooks for authorization
- /sage/auth/return: The redirection uri, you need to set this uri in your QuickBooks application

### Authorization tokens store

The result of an authorization is stored in the SagesStore. By default, the LocalStore is used, which means that the tokens are saved locally.

You can override the SagesStore with your own Store implementation.
```ts
import { SagesModule, SagesStore } from "@recursyve/nestjs-sage";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            imports: [MyStoreImplementationModule],
            store: {
                provide: SagesStore,
                useClass: MyStoreImplementation
            }
        })
    ]
})
export class AppModule {}
```
