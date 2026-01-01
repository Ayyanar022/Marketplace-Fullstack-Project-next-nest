import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import {  tap } from "rxjs/operators";



@Injectable()
export class LoggingInterCeptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>){
        const req = context.switchToHttp().getRequest();
        const {method, originalUrl} = req;
        const start = Date.now();

        return next.handle().pipe(
            tap(()=>{
                const res = context.switchToHttp().getResponse();
                const time = Date.now() -start;

                console.log(
                    `${method} ${originalUrl} -> ${res.statusCode} (${time}ms)`,
                );
            })
        )
        
    }
}