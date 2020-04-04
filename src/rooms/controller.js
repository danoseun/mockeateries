import RoomService from './service';
import Util from '../utils/util';

const util = new Util();

class RoomController {
  static async getAllRooms(req, res) {
    try {
      const allRooms = await RoomService.getAllRooms();
      if (allRooms.length > 0) {
        util.setSuccess(200, 'Rooms retrieved', allRooms);
      } else {
        util.setSuccess(200, 'No Room found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addRoom(req, res) {
    if (!req.body.type || !req.body.guest_type || !req.body.number_of_beds || !req.body.price) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newRoom = req.body;
    try {
      const createdRoom = await RoomService.addRoom(newRoom);
      util.setSuccess(201, 'Room Added!', createdRoom);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedRoom(req, res) {
    const alteredRoom = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatedRoom = await RoomService.updateRoom(id, alteredRoom);
      if (!updatedRoom) {
        util.setError(404, `Cannot find room with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Room updated', updatedRoom);
      }
      return util.send(res);
    } catch (error) {
      console.log('ERROR', error);
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getARoom(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const room = await RoomService.getARoom(id);

      if (!room) {
        util.setError(404, `Cannot find room with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Room', room);
      }
      return util.send(res);
    } catch (error) {
      console.log('ERROR', error);
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteRoom(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const roomToDelete = await RoomService.deleteRoom(id);

      if (roomToDelete) {
        util.setSuccess(200, 'Book deleted');
      } else {
        util.setError(404, `Room with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default RoomController;