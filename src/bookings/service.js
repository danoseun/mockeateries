import database from '../../database/models';

class BookingService {
  static async getAllBookings() {
    try {
      return await database.Booking.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addBooking(newBooking) {
    try {
      return await database.Booking.create(newBooking);
    } catch (error) {
      throw error;
    }
  }

  static async updateBooking(id, updateBooking) {
    try {
      const BookingToUpdate = await database.Booking.findOne({
        where: { id: Number(id) }
      });

      if (BookingToUpdate) {
        await database.Booking.update(updateBooking, { where: { id: Number(id) } });

        return updateBooking;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABooking(id) {
    try {
      const Booking = await database.Booking.findOne({
        where: { id: Number(id) }
      });

      return Booking;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBooking(id) {
    try {
      const BookingToDelete = await database.Booking.findOne({ where: { id: Number(id) } });

      if (BookingToDelete) {
        const deletedBooking = await database.Booking.destroy({
          where: { id: Number(id) }
        });
        return deletedBooking;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingService;