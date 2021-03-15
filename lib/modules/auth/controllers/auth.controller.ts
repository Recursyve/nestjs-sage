import { Controller, Get, Req, Res } from "@nestjs/common";
import { SageAuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { SageConfigService } from "../../config/services/sage-config.service";

@Controller("sage/auth")
export class SageAuthController {
    constructor(
        private readonly authService: SageAuthService,
        private readonly configService: SageConfigService
    ) {}

    @Get()
    public authorize(@Res() res: Response): void {
        res.redirect(this.authService.getAuthorizeUri());
    }

    @Get("return")
    public async authorizeCode(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.authService.authorizeCode(req.url);
            res.redirect(this.configService.global.redirection.successUrl);
        } catch (e) {
            res.redirect(this.configService.global.redirection.errorUrl);
        }
    }
}
