import { StatusCode } from "./enums";

// class ClientError {
//     public status: number;
//     public message: string;
//     public constructor(status: number, message: string) {
//         this.status = status;
//         this.message = message;
//     }
// }

// Same as the above!!

// Base class for all client errors:
abstract class ClientError {
  public constructor(public status: number, public message: string) {}
}

// Resource (id) not found error:
export class ResourceNotFoundError extends ClientError {
  public constructor(id: number) {
    super(StatusCode.NotFound, `id ${id} not found.`);
  }
}

// Route not found error:
export class RouteNotFoundError extends ClientError {
  public constructor(route: string, method: string) {
    super(StatusCode.NotFound, `Route ${route} on method ${method} not exist.`);
  }
}

// Validation error:
export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(StatusCode.BadRequest, message);
  }
}

// Unauthorized error:
export class UnauthorizedError extends ClientError {
  public constructor(message: string) {
    super(StatusCode.Unauthorized, message);
  }
}
