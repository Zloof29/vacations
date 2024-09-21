import Joi from "joi";
import { ValidationError } from "./client-error";

export class LikeModel {
  public id: number;
  public userId: number;
  public vacationId: number;
  public status: string;

  public constructor(like: LikeModel) {
    this.id = like.id;
    this.userId = like.userId;
    this.vacationId = like.vacationId;
  }

  private static likeValidationSchema = Joi.object({
    id: Joi.number().required(),
    userId: Joi.number().required(),
    vacationId: Joi.number().required(),
  });

  public validateLike() {
    const result = LikeModel.likeValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
