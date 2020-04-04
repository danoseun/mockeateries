import BookingService from './service';
import Util from '../utils/util';

const util = new Util();

class BookingController {
  static async getAllBookings(req, res) {
    try {
      const allBookings = await BookingService.getAllBookings();
      if (allBookings.length > 0) {
        util.setSuccess(200, 'Bookings retrieved', allBookings);
      } else {
        util.setSuccess(200, 'No Booking found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addBooking(req, res) {
    if (!req.body.number_of_guests || !req.body.user_id || !req.body.checkin_date || !req.body.checkout_date) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newBooking = req.body;
    try {
      const createdBooking = await BookingService.addBooking(newBooking);
      util.setSuccess(201, 'Booking Added!', createdBooking);
      console.log('RES', res.body);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedBooking(req, res) {
    const alteredBooking = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatedBooking = await BookingService.updateBooking(id, alteredBooking);
      if (!updatedBooking) {
        util.setError(404, `Cannot find booking with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Booking updated', updatedBooking);
      }
      return util.send(res);
    } catch (error) {
      console.log('ERROR', error);
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getABooking(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const Booking = await BookingService.getABooking(id);

      if (!Booking) {
        util.setError(404, `Cannot find booking with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Booking', Booking);
      }
      return util.send(res);
    } catch (error) {
      console.log('ERROR', error);
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteBooking(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const BookingToDelete = await BookingService.deleteBooking(id);

      if (BookingToDelete) {
        util.setSuccess(200, 'Book deleted');
      } else {
        util.setError(404, `Booking with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default BookingController;