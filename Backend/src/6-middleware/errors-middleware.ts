import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { RouteNotFoundError } from "../3-models/client-error";
import { logger } from "../2-utils/logger";
import { appConfig } from "../2-utils/app-config";

class ErrorsMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction) {

        console.log(err);

        logger.logError(err); // תיעוד שגיאות
        
        const statusCode = err.status || StatusCode.InternalServerError;

        // מניעת החזרת הודעות קריסה ללקוח בפרודקשיין
        const isCrash = statusCode >= 500 && statusCode <= 599;
        const message = appConfig.isProduction && isCrash ? "Some error, please try again." : err.message;

        response.status(statusCode).send(message);
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction) {

        const err = new RouteNotFoundError(request.originalUrl, request.method);

        next(err);
    }

}

export const errorsMiddleware = new ErrorsMiddleware();
