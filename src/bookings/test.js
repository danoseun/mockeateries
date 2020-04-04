import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the booking endpoints:', () => {
  it('It should create a booking', (done) => {
    const booking = {
      number_of_guests: 2,
      user_id: 3,
      checkin_date: new Date('2020-04-12T23:00:00.000Z'),
      checkout_date: new Date('4/15/20')
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('Accept', 'application/json')
      .send(booking)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          number_of_guests: booking.number_of_guests,
          user_id: booking.user_id,
          checkin_date: booking.checkin_date,
          checkout_date: booking.checkout_date,
        });
        done();
      });
  });
  
  // Second create
  it('It should create another booking', (done) => {
    const booking = {
        number_of_guests: 6,
        user_id: 2,
        checkin_date: new Date('2/12/2020'),
        checkout_date: new Date('2/15/2020')
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('Accept', 'application/json')
      .send(booking)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 2,
          number_of_guests: booking.number_of_guests,
          user_id: booking.user_id,
          checkin_date: booking.checkin_date,
          checkout_date: booking.checkout_date,
        });
        done();
      });
  });

  it('It should not create a booking with incomplete parameters', (done) => {
    const booking = {
      number_of_guests: 3,
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('Accept', 'application/json')
      .send(booking)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all bookings', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('number_of_guests');
        res.body.data[0].should.have.property('user_id');
        res.body.data[0].should.have.property('checkin_date');
        res.body.data[0].should.have.property('checkout_date');
        done();
      });
  });

  it('It should get a particular booking', (done) => {
    const bookingId = '1';
    chai.request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('number_of_guests');
        res.body.data.should.have.property('user_id');
        res.body.data.should.have.property('checkin_date');
        res.body.data.should.have.property('checkout_date');
        done();
      });
  });

  it('It should not get a particular booking with invalid id', (done) => {
    const bookingId = 8888;
    chai.request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find booking with the id ${bookingId}`);
        done();
      });
  });

  it('It should not get a particular booking with non-numeric id', (done) => {
    const bookingId = 'aaa';
    chai.request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a booking', (done) => {
    const bookingId = '1';
    const updatedBooking = {
      id: 1,
      number_of_guests: 2,
      user_id: 3,
      checkin_date: '1/20/20',
      checkout_date: '1/29/20'
    };
    chai.request(app)
      .put(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .send(updatedBooking)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedBooking.id);
        expect(res.body.data.number_of_guests).equal(updatedBooking.number_of_guests);
        expect(res.body.data.user_id).equal(updatedBooking.user_id);
        expect(res.body.data.checkin_date).equal(updatedBooking.checkin_date);
        expect(res.body.data.checkout_date).equal(updatedBooking.checkout_date);
        done();
      });
  });

  it('It should not update a booking with invalid id', (done) => {
    const bookingId = '9999';
    const updatedbooking = {
      id: bookingId,
      number_of_guests: 3,
      user_id: 3,
      checkin_date: new Date('1/2/20'),
      checkout_date: new Date('1/6/20')
    };
    chai.request(app)
      .put(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .send(updatedbooking)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find booking with the id: ${bookingId}`);
        done();
      });
  });

  it('It should not update a booking with non-numeric id value', (done) => {
    const bookingId = 'ggg';
    const updatedbooking = {
      id: bookingId,
      number_of_guests: 4,
      user_id: 3,
      checkin_date: new Date('1/2/20'),
      checkout_date: new Date('1/6/20')
    };
    chai.request(app)
      .put(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .send(updatedbooking)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a booking', (done) => {
    const bookingId = 1;
    chai.request(app)
      .delete(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a booking with invalid id', (done) => {
    const bookingId = 777;
    chai.request(app)
      .delete(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Booking with the id ${bookingId} cannot be found`);
        done();
      });
  });

  it('It should not delete a booking with non-numeric id', (done) => {
    const bookingId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/bookings/${bookingId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});