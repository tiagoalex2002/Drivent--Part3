import HotelServices from "@/services/hotel-services";
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getHotels (req : AuthenticatedRequest, res : Response) {
    const {userId} = req;

    try {
        const result = await HotelServices.getHotels(userId)
        if ( result === 402) {
            return res.sendStatus(402)
        }
        return res.status(httpStatus.OK).send(result); 
    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    } 
}

export async function getHotelInfo (req: AuthenticatedRequest, res: Response) {
    const {userId} = req;
    const { hotelId } = req.params;
    const Id = Number(hotelId);

    try {
        const result = await HotelServices.getHotelInfo(Id, userId)
        if ( result === 402) {
            return res.sendStatus(402)
        }
        return res.status(httpStatus.OK).send(result); 
    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    
}

