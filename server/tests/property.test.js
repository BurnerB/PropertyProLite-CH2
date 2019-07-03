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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
          city: 'Nairobi',
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
    it('should successfully update property advert', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert with no token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', ' ')
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
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

    it('should not update a property advert with forbidden token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
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

    it('should not update a property advert if no id exists', (done) => {
      chai.request(app)
        .patch('/api/v1/property/111')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid price', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 'yazaa',
          state: 'Nairobi',
          city: 'Nairobi',
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

    it('should not update advert with invalid state', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nai@robi',
          city: 'Nairobi',
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

    it('should not update advert with invalid city', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'N@irobi',
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

    it('should not update advert with invalid address', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Keny@',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid type', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '1Rm',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid image_url', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing price', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: '',
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing state', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: '',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing city', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: '',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing address', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: '',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing type', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing image_url', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
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
  });

  describe('/PATCH sold-property', () => {
    it('should successfully mark property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not mark a property advert with no token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          if (err) return done();
          done();
        });
    });

    it('should not mark a property advert with forbidden token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          if (err) return done();
          done();
        });
    });

    it('should not mark a property advert if no id exists', (done) => {
      chai.request(app)
        .patch('/api/v1/property/111/sold')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });
  });

  describe('/DELETE property', () => {
    it('should successfully delete a  property advert', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not delete property advert with no token', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          if (err) return done();
          done();
        });
    });

    it('should not delete a property advert with forbidden token', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          if (err) return done();
          done();
        });
    });

    it('should not delete a property advert if no id exists', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });
  });

  describe('/PATCH property fraudulent', () => {
    // it('should not mark property as fraudulent', (done) => {
    //   chai.request(app)
    //     .patch('/api/v1/property/1/fraudulent')
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send({
    //       reason: 'fake picture',
	  //       description: 'picture does not match actual property',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       if (err) return done();
    //       done();
    //     });
    // });

    it('should not mark property as fraudulent with no token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/fraudulent')
        .set('authorization', ' ')
        .send({
          reason: 'fake picture',
	        description: 'picture does not match actual property',
        })
        .end((err, res) => {
          res.should.have.status(401);
          if (err) return done();
          done();
        });
    });

    it('should not mark property as fraudulent with invalid reason', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/fraudulent')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          reason: new Array(52).join('a'),
          description: 'The picture in the description does not match the actual property',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not mark property as fraudulent with invalid description', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/fraudulent')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          reason: 'fake picture',
          description: new Array(102).join('a'),
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not mark property as fraudulent wih no reason', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/fraudulent')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          reason: ' ',
          description: 'The pictur@#$e in the description does not match the actual property',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not mark property as fraudulent with no description', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/fraudulent')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          reason: 'fake picture',
          description: ' ',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not mark property as fraudulent with invalid property id', (done) => {
      chai.request(app)
        .patch('/api/v1/property/200/fraudulent')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          reason: 'fake picture',
          description: 'The picture in the description does not match the actual property',
        })
        .end((err, res) => {
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });
  });
});
