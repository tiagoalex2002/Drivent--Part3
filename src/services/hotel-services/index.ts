import HotelRepository from "@/repositories/hotels-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function getHotels(userId : number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if (!ticket) {
        throw notFoundError()
    } else if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false ) {
        return 402;
    } else {
        const hotels = await HotelRepository.getHotels();
        return hotels;
    }
}

async function getHotelInfo(Id: number, userId : number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if (!ticket) {
        throw notFoundError()
    } else if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false ) {
        return 402;
    } else {
        const info = await HotelRepository.getHotelInfo(Id);
        return info;
    }
}

const HotelServices = {
    getHotels,
    getHotelInfo
}


export default HotelServices;