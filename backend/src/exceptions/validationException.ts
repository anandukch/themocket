import { ValidationError } from "class-validator";

class ValidationException extends Error {
  public status: number;
  public errors: ValidationError[];

  constructor(status: number, message: string, error: ValidationError[]) {
    super(message);
    this.status = status;
    this.errors = error;
  }
}

export default ValidationException;
