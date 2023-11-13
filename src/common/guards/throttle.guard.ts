import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';

@Injectable()
export class ThrottleGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector);
  }

  protected async throwThrottlingException(context: ExecutionContext) {
    //@ts-ignore
    const { expiresAt } = Object.values(this.storageService.storage)[0];
    throw new HttpException(
      `Too Many Requests, please try again in ${Math.round(
        (expiresAt - Date.now()) / 1000,
      )} seconds`,
      429,
    );
  }
}
