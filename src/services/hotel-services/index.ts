import HotelRepository from "@/repositories/hotels-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from '@/errors';

async function getHotels() {
    const hotels = await HotelRepository.getHotels();
}

async function getHotelInfo(Id: number) {
    const info = await HotelRepository.getHotelInfo(Id);
}

const HotelServices = {
    getHotels,
    getHotelInfo
}


export default HotelServices;