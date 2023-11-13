import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsValidIsbnValidator as validator } from 'src/common/validators/is-valid-isbn.validator';

export const ValidISBN = (options?: ValidationOptions, constraints?: any) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName,
      options,
      validator,
      constraints,
    });
  };
};
