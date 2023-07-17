import { Router } from "express";
import { getHotelInfo,getHotels } from "@/controllers/hotel-controller";
import { authenticateToken } from "@/middlewares";

const hotelRouter = Router();

hotelRouter.get ("/", authenticateToken, getHotels)
hotelRouter.get("/:hotelId", authenticateToken, getHotelInfo)

export {hotelRouter}