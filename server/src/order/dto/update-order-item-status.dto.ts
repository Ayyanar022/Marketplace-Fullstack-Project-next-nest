import {IsEnum} from 'class-validator';


export enum SellerOrderItemStatus{
 PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
}

export class UpdateOrderItemStatusDto{
    @IsEnum(SellerOrderItemStatus)
    status:SellerOrderItemStatus;
}