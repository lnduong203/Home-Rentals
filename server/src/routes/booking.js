import {Router} from 'express';
import * as bookingController from '../app/controllers/booking.controller.js'

const router = Router();

router.post('/create', bookingController.createBooking)


export default router;