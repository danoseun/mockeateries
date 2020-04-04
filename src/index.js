import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import roomRouter from '../src/rooms/route';
import bookingRouter from '../src/bookings/route';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 1900;

app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/bookings', bookingRouter);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
export default app;