import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpExceptionsFilter } from 'src/common/filters/http-exception.filter';
import { ThrottleGuard } from 'src/common/guards/throttle.guard';
import { WrapResponseInterceptor } from 'src/common/interceptors/wrap.response.interceptor';
import LogsMiddleware from 'src/common/middleware/logs.middleware';
import { GlobalValidationPipe } from 'src/common/pipes/global-validation.pipe';
import { TrimPipe } from 'src/common/pipes/input-trim.pipe';
import { BookModule } from './book/book.module';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60,
            limit: 20,
        }]),
        BookModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useValue: GlobalValidationPipe.factory(),
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottleGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: WrapResponseInterceptor,
        },
        {
            provide: APP_PIPE,
            useClass: TrimPipe,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                LogsMiddleware,
            )
            .forRoutes({ method: RequestMethod.ALL, path: '*' });
    }
}
