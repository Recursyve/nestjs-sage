import { Inject, Injectable } from "@nestjs/common";
import { SageConfigAuthModel } from "../models/sage-config-auth.model";
import { SageConfigModel } from "../models/sage-config.model";
import { GLOBAL_CONFIG } from "../../../constants";

@Injectable()
export class SageConfigService {
    public readonly auth: SageConfigAuthModel;

    constructor(@Inject(GLOBAL_CONFIG) public readonly global: SageConfigModel) {
        this.auth = new SageConfigAuthModel();
    }
}
