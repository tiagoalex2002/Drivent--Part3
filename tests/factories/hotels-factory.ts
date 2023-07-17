import faker from '@faker-js/faker';
import { prisma } from '@/config';

function getRandomInt() {
    return Math.floor(Math.random() * 5);
  }

export async function createHotel() {
    return prisma.hotel.create({
      data: {
        name : faker.company.companyName(),
        image : faker.image.imageUrl(),
        createdAt: new Date (Date.now())
      },
    });
  }

export async function createRoom (Id : number) {
    return prisma.room.create ({
        data: {
            name : faker.name.findName(),
            capacity: getRandomInt(),
            hotelId : Id,
            createdAt: new Date(Date.now())
        },
    })
}