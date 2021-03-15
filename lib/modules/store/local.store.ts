import { Token } from "client-oauth2";
import { SageStore } from "./store.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStore extends SageStore {
    private token: Token;

    public async getToken(): Promise<Token> {
        return this.token;
    }

    public async setToken(token: Token): Promise<void> {
        this.token = token;
        console.log(token.accessToken);
    }
}
