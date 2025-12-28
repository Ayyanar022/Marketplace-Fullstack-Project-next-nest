import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";




@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(
            map((data)=>{
                return {
                    success :true ,
                    message :"Request sucessful",
                    data,
                    timeStamp :new Date().toISOString()
                }
            })
        )
    }
}