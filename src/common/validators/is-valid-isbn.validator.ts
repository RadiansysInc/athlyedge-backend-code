import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { validateISBN } from 'src/common/helpers/app.helper';

@ValidatorConstraint({ name: 'IsValidIsbnValidator', async: false })
export class IsValidIsbnValidator implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (!value) return false;
    return validateISBN(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid ISBN`;
  }
}
