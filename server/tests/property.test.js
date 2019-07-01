import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

let userToken;
let agentToken;

describe('/PROPERTY', () => {
  before('generate JWT', (done) => {
    agentToken = jwt.sign({
      email: 'johndoe@gmail.com',
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      address: 'Rwanda',
      is_Agent: true,
      is_Admin: false,
    },
    process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    userToken = jwt.sign({
      email: 'johndoe2@gmail.com',
      id: 2,
      firstname: 'John',
      lastname: 'Doe',
      address: 'Rwanda',
      is_Agent: false,
      is_Admin: false,
    },
    process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    done();
  });
  describe('/POST property', () => {
    it('should successfully post a property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(201);
          if (err) return done();
          done();
        });
    });

    it('should not post a property advert with invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(403);
          if (err) return done();
          done();
        });
    });

    it('should not post a property advert with no token', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', ' ')
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(401);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing status', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: '',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing price', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: '',
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing state', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: '',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing city', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: '',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing address', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: '',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing type', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing image_url', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid status', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: '12#fj',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid price', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 'a large mount',
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid state', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: '1234',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid city', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: '1234',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid address', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: '@#%%',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid type', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: '  Kenya',
          type: ' @#%@',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with image_url status', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi City',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: '@#%%',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });
  });

  describe('/PATCH property', () => {
    it('should successfully update price of property advert', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert with no token', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', ' ')
        .send({
          rice: 6000000,
        })
        .end((err, res) => {
          res.should.have.status(401);
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert with invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          price: 6000000,
        })
        .end((err, res) => {
          res.should.have.status(403);
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert if no id exists', (done) => {
      chai.request(app)
        .post('/api/v1/property/100')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          price: 6000000,
        })
        .end((err, res) => {
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });

    it('should successfully update state of property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          state: 'Kisumu',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should successfully update city of property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          city: 'Kisumu City',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should successfully update address of property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          address: 'Rwanda',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should successfully update address of type advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          type: '3 bedroom',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should successfully update image_url of type advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });
  });
});
