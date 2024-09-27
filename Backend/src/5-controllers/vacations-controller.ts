import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";
import { vacationService } from "../4-services/vacation-service";
import { VacationModel } from "../3-models/vacation-model";
import { LikeModel } from "../3-models/like-model";

// Product controller - listening to product requests:
class VacationController {
  // Creating a router object:
  public readonly router = express.Router();

  // Register routes:
  public constructor() {
    this.router.get(
      "/vacations/",
      securityMiddleware.validateLogin,
      this.getAllVacations
    );
    this.router.get(
      "/vacation/:vacationId",
      securityMiddleware.validateLogin,
      this.getVacationsById
    );
    this.router.get(
      "/vacations/user/:userId([0-9]+)",
      securityMiddleware.validateLogin,
      this.getAllVacationsByUserId
    );
    this.router.get(
      "/activeVacations/",
      securityMiddleware.validateLogin,
      this.displayActiveVacations
    );
    this.router.get(
      "/inactiveVacations/",
      securityMiddleware.validateLogin,
      this.displayInactiveVacations
    );
    this.router.get(
      "/likedVacations/:userId([0-9]+)",
      // securityMiddleware.validateLogin,
      this.displayLikedVacations
    );
    this.router.post(
      "/vacations",
      securityMiddleware.validateAdmin,
      this.addVacation
    );
    this.router.post(
      "/vacationLike/:userId/:vacationId([0-9]+)",
      this.addLikeToVacation
    );
    this.router.put(
      "/vacation/:id([0-9]+)",
      securityMiddleware.validateAdmin,
      this.updateVacation
    );
    this.router.delete(
      "/vacations/:id([0-9]+)",
      securityMiddleware.validateAdmin,
      this.deleteVacation
    );
    this.router.delete(
      "/vacationsLike/:userId/:vacationId([0-9]+)",
      this.deleteVacationLike
    );
    this.router.get("/vacations/images/:imageName", this.getVacationImage);
  }

  private async getAllVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacations = await vacationService.getAllVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err); // Go to catchAll middleware!
    }
  }

  private async getVacationsById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.vacationId;
      const vacations = await vacationService.getVacationsById(id);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async getAllVacationsByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      console.log("Getting all vacations from the database...");
      const userId = +request.params.userId;
      const vacations = await vacationService.getAllVacationsByUserId(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err); // Go to catchAll middleware!
    }
  }

  private async displayLikedVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      console.log("Getting all vacations from the database...");
      const userId = +request.params.userId;
      const vacations = await vacationService.displayLikedVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      request.body.imageName = request.files?.imageName;
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.addVacation(vacation);
      response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacationId = +request.params.id;
      request.body.id = vacationId;
      request.body.imageName = request.files?.imageName;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationService.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }

  private async displayActiveVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacations = await vacationService.displayActiveVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async displayInactiveVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacations = await vacationService.displayInactiveVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await vacationService.deleteVacation(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteVacationLike(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await vacationService.deleteLikeVacation(userId, vacationId);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  private async getVacationImage(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName, true);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }

  private async addLikeToVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId, vacationId } = request.params;
      const like = new LikeModel({ ...request.body, userId, vacationId });
      const addedLike = await vacationService.likeVacation(like);
      response.status(StatusCode.Created).json(addedLike);
    } catch (err: any) {
      next(err);
    }
  }
}

export const vacationController = new VacationController();
