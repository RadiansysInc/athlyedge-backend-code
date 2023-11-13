import { Logger } from "@nestjs/common";
import { round } from 'lodash';
import * as util from 'util';

export const queryLog = {
    query: {
        $allModels: {
            async $allOperations(obj: any) {
                const { operation, model, args, query } = obj;
                const start = performance.now();
                const result = await query(args);
                const end = performance.now();
                const time = end - start;
                Logger.log(`[PRISMA QUERY] ${model}.${operation} took ${round(time)}ms`);
                if (['delete', 'update'].includes(operation)) {
                    Logger.log(
                        util.inspect(
                            `[PRISMA ${operation.toUpperCase()}] : `,
                            {
                                showHidden: false,
                                depth: null,
                                colors: true,
                            },
                        ),
                    );
                }
                return result;
            },
        },
    },
};


export const deletedAtKey = {
    result: {
        $allModels: {
            deletedAt: {
                compute(obj: Record<string, any>) {
                    return undefined;
                },
            },
        },
    },
};
