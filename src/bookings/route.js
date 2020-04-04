import { Router } from 'express';
import BookingController from './controller';


const bookingRouter = Router();

bookingRouter.get('/', BookingController.getAllBookings);
bookingRouter.post('/', BookingController.addBooking);
bookingRouter.get('/:id', BookingController.getABooking);
bookingRouter.put('/:id', BookingController.updatedBooking);
bookingRouter.delete('/:id', BookingController.deleteBooking);

export default bookingRouter;