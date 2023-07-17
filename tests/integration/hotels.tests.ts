import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createEnrollmentWithAddress, createUser, createHotel, createRoom, createTicket, createTicketType } from '../factories';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
    await init();
  });
  
  beforeEach(async () => {
    await cleanDb();
  });
  
  const server = supertest(app);

describe('GET hotels/', () => {
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
    
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

    it ('it should return 404 when there is no enrollment', async () => {
        const token = await generateValidToken();
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it ('it should return 404 when there is no ticket', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user);

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it ('it should return 404 when there is no hotel', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user);

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('it should return 402 if the ticket has not been paid yet', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'RESERVED')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(402)
    });

    it('should return 402 if the ticket is remote', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(402)
    });

    it('should return 402 if ticket does not include a hotel', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(402)
    });

    it('should return 200 and hotels list data', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')
        const hotel= await createHotel();
        const room = await createRoom(hotel.id)

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            [{id: response.body.id,
                name: response.body.name,
                image: response.body.image,
                createdAt: response.body.createdAt.toISOString(),
                updatedAt: response.body.updatedAt.toISOString(),}]
        )
    })

    });

describe('GET hotels/:hotelId', () => {
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
    
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

    it ('it should return 404 when there is no enrollment', async () => {
        const token = await generateValidToken();
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it ('it should return 404 when there is no ticket', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user);

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it ('it should return 404 when there is no hotel', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user);

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('it should return 402 if the ticket has not been paid yet', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'RESERVED')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(402)
    });

    it('should return 402 if the ticket is remote', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(402)
    });

    it('should return 402 if ticket does not include a hotel', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(402)
    });

    it('should return 200 and hotels list data', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enroll= await createEnrollmentWithAddress(user);
        const type= await createTicketType()
        const ticket= await createTicket(enroll.id, type.id, 'PAID')
        const hotel= await createHotel();
        const room = await createRoom(hotel.id)

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {id: response.body.id,
                name: response.body.name,
                image: response.body.image,
                createdAt: response.body.createdAt.toISOString(),
                updatedAt: response.body.updatedAt.toISOString(),
                Rooms : [ {
                    id: response.body.Rooms[0].id,
                name: response.body.Rooms[0].name,
                capacity: response.body.Rooms[0].capacity,
                hotelId: response.body.Rooms[0].hotelId,
                createdAt: response.body.Rooms[0].createdAt.toISOString(),
                updatedAt: response.body.Rooms[0].updatedAt.toISOString() }]}
        )
    })
})