import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-error";

class SecurityMiddleware {
  // Prevent XSS attack:
  public preventXssAttack(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    for (const prop in request.body) {
      const value = request.body[prop];
      if (typeof value === "string" && value.includes("<script")) {
        response.status(StatusCode.Forbidden).send("Nice try!");
        return;
      }
    }

    next(); // Continue the request to the next middleware.
  }

  // Validate token:
  public validateLogin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Take header:
    const authorizationHeader = request.headers.authorization;

    // "Bearer the-token..."
    //  01234567
    const token = authorizationHeader?.substring(7);

    // Check if valid:
    const isValid = cyber.isTokenValid(token);

    // If not valid:
    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
    } else {
      next();
    }
  }

  // Validate admin:
  public validateAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Take header:
    const authorizationHeader = request.headers.authorization;

    // "Bearer the-token..."
    //  01234567
    const token = authorizationHeader?.substring(7);

    // Check if valid:
    const isValid = cyber.isTokenValid(token);

    // If not valid:
    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
      return;
    }

    // Check if admin:
    const isAdmin = cyber.isAdmin(token);

    // If not admin:
    if (!isAdmin) {
      next(new UnauthorizedError("You are not authorized."));
      return;
    }

    next();
  }
}

export const securityMiddleware = new SecurityMiddleware();
