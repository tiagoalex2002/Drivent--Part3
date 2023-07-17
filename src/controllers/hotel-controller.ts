import HotelServices from "@/services/hotel-services";
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getHotels (req : AuthenticatedRequest, res : Response) {
    const {userId} = req;
    const result = await HotelServices.getHotels(userId)
    return res.status(httpStatus.OK).send(result);
}

export async function getHotelInfo (req: AuthenticatedRequest, res: Response) {
    const {userId} = req;
    const { hotelId } = req.params;
    const Id = Number(hotelId)
    
    const result = await HotelServices.getHotelInfo(Id, userId)

    return res.status(httpStatus.OK).send(result)
}

