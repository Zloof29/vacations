import { ValidationError } from "./client-error";
import { Role } from "./enums";
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static passwordComplexityOptions = {
    min: 4,
    max: 500,
    requirementCount: 4,
  };

  private static userValidationSchema = Joi.object({
    id: Joi.number().integer().positive(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: PasswordComplexity(this.passwordComplexityOptions).required(),
    roleId: Joi.number().integer().positive(),
  });

  public validateUser() {
    const result = UserModel.userValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
