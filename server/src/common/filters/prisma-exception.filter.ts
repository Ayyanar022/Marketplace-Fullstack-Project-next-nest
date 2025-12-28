import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";




@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter{
    catch(
        exception:Prisma.PrismaClientKnownRequestError,
        host:ArgumentsHost,
    ){
        const ctx = host.switchToHttp();
        const response  = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.BAD_REQUEST;
        let message = "Database error";

        switch(exception.code){
            case 'P2002':
                message = 'Duplicate value already exists';
                status = HttpStatus.CONFLICT;
                break;
            
            case 'P2025':
                message = 'Record not found';
                status = HttpStatus.NOT_FOUND;
                break;
            case 'P2003':
                message =  'Invalid reference data';
                status = HttpStatus.BAD_REQUEST;
                break ;                
        }


        response.status(status).json({
            success:false,
            message,
            error:{
                code:exception.code,
                meta :exception.meta,
            },
            timeStamp :new Date().toISOString(),
            path:request.url,

        })



    }
}