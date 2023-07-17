import { prisma } from "@/config";
import { Hotel, Room, Booking } from "@prisma/client";

async function getHotels(): Promise<Hotel[]> {
    return await prisma.hotel.findMany();
}

async function getHotelInfo (Id : number) {
    return await prisma.hotel.findUnique( { include : { Rooms : true} , where : { id: Id}})
}

const HotelRepository = {
    getHotelInfo,
    getHotels
}

export default HotelRepository;
