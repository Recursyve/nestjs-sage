import { Injectable } from "@nestjs/common";
import { Token } from "client-oauth2";

@Injectable()
export abstract class SageStore {
    public abstract setToken(token: Token): Promise<void>;
    public abstract getToken(): Promise<Token>;
}
