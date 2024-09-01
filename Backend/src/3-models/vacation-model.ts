import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-error";

export class VacationModel {
  public id: number;
  public vacationDestination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public imageName: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.vacationDestination = vacation.vacationDestination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageName = vacation.imageName;
  }

  private static vacationValidationSchema = Joi.object({
    id: Joi.number().integer(),
    vacationDestination: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(1000).required(),
    startDate: Joi.date().iso().greater("now").required(),
    endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
    price: Joi.number().positive().required(),
    imageName: Joi.object().required(),
  });

  private static updateVacationValidationSchema = Joi.object({
    id: Joi.number().integer().optional(),
    vacationDestination: Joi.string().min(3).max(50).optional(),
    description: Joi.string().min(5).max(1000).optional(),
    startDate: Joi.date().iso().greater("now").optional(),
    endDate: Joi.date().iso().greater(Joi.ref("startDate")).optional(),
    price: Joi.number().positive().optional(),
    imageName: Joi.object().optional(),
  });

  public validateVacations() {
    const result = VacationModel.vacationValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdateVacation() {
    const result = VacationModel.updateVacationValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
