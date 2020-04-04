import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the room endpoints:', () => {
  it('It should create a room', (done) => {
    const room = {
      type: 'Dorm room',
      guest_type: 'male and female',
      number_of_beds: 2,
      price: 900
    };
    chai.request(app)
      .post('/api/v1/rooms')
      .set('Accept', 'application/json')
      .send(room)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          type: room.type,
          guest_type: room.guest_type,
          number_of_beds: room.number_of_beds,
          price: room.price,
        });
        done();
      });
  });
  
  // Second create
  it('It should create a room', (done) => {
    const room = {
      type: 'single room',
      guest_type: 'males only',
      number_of_beds: 2,
      price: 1000
    };
    chai.request(app)
      .post('/api/v1/rooms')
      .set('Accept', 'application/json')
      .send(room)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 2,
          type: room.type,
          guest_type: room.guest_type,
          number_of_beds: room.number_of_beds,
          price: room.price,
        });
        done();
      });
  });

  it('It should not create a room with incomplete parameters', (done) => {
    const book = {
      type: 'single room',
    };
    chai.request(app)
      .post('/api/v1/rooms')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all rooms', (done) => {
    chai.request(app)
      .get('/api/v1/rooms')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('type');
        res.body.data[0].should.have.property('guest_type');
        res.body.data[0].should.have.property('number_of_beds');
        res.body.data[0].should.have.property('price');
        done();
      });
  });

  it('It should get a particular room', (done) => {
    const roomId = '1';
    chai.request(app)
      .get(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('guest_type');
        res.body.data.should.have.property('number_of_beds');
        res.body.data.should.have.property('price');
        done();
      });
  });

  it('It should not get a particular room with invalid id', (done) => {
    const roomId = 8888;
    chai.request(app)
      .get(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find room with the id ${roomId}`);
        done();
      });
  });

  it('It should not get a particular room with non-numeric id', (done) => {
    const roomId = 'aaa';
    chai.request(app)
      .get(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a room', (done) => {
    const roomId = '2';
    const updatedRoom = {
      id: 2,
      type: 'Dorm room',
      guest_type: 'female',
      number_of_beds: 2,
      price: 3000
    };
    chai.request(app)
      .put(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .send(updatedRoom)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedRoom.id);
        expect(res.body.data.type).equal(updatedRoom.type);
        expect(res.body.data.guest_type).equal(updatedRoom.guest_type);
        expect(res.body.data.number_of_beds).equal(updatedRoom.number_of_beds);
        expect(res.body.data.price).equal(updatedRoom.price);
        done();
      });
  });

  it('It should not update a room with invalid id', (done) => {
    const roomId = '9999';
    const updatedRoom = {
      id: roomId,
      type: 'Dorm Room',
      guest_type: 'male and female',
      number_of_beds: 4,
      price: 1000
    };
    chai.request(app)
      .put(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .send(updatedRoom)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find room with the id: ${roomId}`);
        done();
      });
  });

  it('It should not update a room with non-numeric id value', (done) => {
    const roomId = 'ggg';
    const updatedRoom = {
      id: roomId,
      type: 'Dorm room',
      guest_type: 'male and female',
      number_of_beds: 2,
      price: 900
    };
    chai.request(app)
      .put(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .send(updatedRoom)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a room', (done) => {
    const roomId = 1;
    chai.request(app)
      .delete(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a room with invalid id', (done) => {
    const roomId = 777;
    chai.request(app)
      .delete(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Room with the id ${roomId} cannot be found`);
        done();
      });
  });

  it('It should not delete a room with non-numeric id', (done) => {
    const roomId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/rooms/${roomId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});