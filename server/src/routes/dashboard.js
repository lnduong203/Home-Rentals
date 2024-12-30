import {Router} from 'express'
import * as dashboardController from '../app/controllers/dashboard.controller.js'

const router = Router();

router.get('/', dashboardController.overView ) 
router.get('/users', dashboardController.users )
router.get('/listings', dashboardController.listings )
router.get('/bookings', dashboardController.bookings )


export default router;