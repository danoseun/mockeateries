import { Router } from 'express';
import RoomController from './controller';


const roomRouter = Router();

roomRouter.get('/', RoomController.getAllRooms);
roomRouter.post('/', RoomController.addRoom);
roomRouter.get('/:id', RoomController.getARoom);
roomRouter.put('/:id', RoomController.updatedRoom);
roomRouter.delete('/:id', RoomController.deleteRoom);

export default roomRouter;