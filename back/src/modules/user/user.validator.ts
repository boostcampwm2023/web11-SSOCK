import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      await this.userRepository.getUserData(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return '존재하지 않는 유저입니다.';
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule
    });
  };
}
