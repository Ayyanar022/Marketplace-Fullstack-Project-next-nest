import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";



@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {

    catch(exception:unknown , host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal service error';
        let error = null ;

        if(exception instanceof HttpException){
            status = exception.getStatus();
            const  res = exception.getResponse();

            if(typeof res === 'string'){
                message=res;
            }else{
                message = (res as any).message || message ;
                error = (res as any).error || null ;
            }
        }


        response.status(status).json({
            success :false,
            message,
            error,
            timeStamp : new Date().toISOString(),
            path:request.url
        })


    }
}