import database from '../../database/models';

class RoomService {
  static async getAllRooms() {
    try {
      return await database.Room.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addRoom(newRoom) {
    try {
      return await database.Room.create(newRoom);
    } catch (error) {
      throw error;
    }
  }

  static async updateRoom(id, updateRoom) {
    try {
      const roomToUpdate = await database.Room.findOne({
        where: { id: Number(id) }
      });

      if (roomToUpdate) {
        await database.Room.update(updateRoom, { where: { id: Number(id) } });

        return updateRoom;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getARoom(id) {
    try {
      const room = await database.Room.findOne({
        where: { id: Number(id) }
      });

      return room;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRoom(id) {
    try {
      const roomToDelete = await database.Room.findOne({ where: { id: Number(id) } });

      if (roomToDelete) {
        const deletedRoom = await database.Room.destroy({
          where: { id: Number(id) }
        });
        return deletedRoom;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default RoomService;