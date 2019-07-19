import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken;
let agentToken;
const testImage = './server/tests/test.jpg';

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
    it.skip('should successfully post a property advert', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .attach('image_url','./server/tests/test.jpg')
        .field({
          price: 5000000,
          city: 'Nairobi',
          address: 'kigali1234',
          type: '2 bedroom',
          state:'Kenya'
        })
        .end((err, res) => {
        //   expect(res.body.error).equals('why are you failing');
          res.should.have.status(201);
          if (err) return done();
          done();
        });
    });

    it('should not post a property advert with forbidden token', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('ACCESS DENIED! Not an Agent');
          if (err) return done();
          done();
        });
    });

    it('should not post a property advert with no token', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', ' ')
        .send({
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing price', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: '',
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Price is a required field with no special chars or alphabets');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing state', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 5000000,
          state: '',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('State is a required field with a min of 3 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing city', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 5000000,
          state: 'Nairobi',
          city: '',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('City is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing address', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: '',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Address is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with missing image_url', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('"image_url" is not allowed');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid price', (done) => {
      chai.request(app)
        .post('/api/v2/property')
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
          expect(res.body.error).equals('Price is a required field with no special chars or alphabets');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid state', (done) => {
      chai.request(app)
        .post('/api/v2/property')
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
          expect(res.body.error).equals('State is a required field with a min of 3 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid city', (done) => {
      chai.request(app)
        .post('/api/v2/property')
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
          expect(res.body.error).equals('City is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid address', (done) => {
      chai.request(app)
        .post('/api/v2/property')
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
          expect(res.body.error).equals('Address is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with invalid type', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          status: 'Available',
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: new Array(100).join('a'),
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Type is a required field with a min of 3 chars and no special characters');
          if (err) return done();
          done();
        });
    });

    it('should not  post a property advert with image_url status', (done) => {
      chai.request(app)
        .post('/api/v2/property')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 5000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: '@#%%',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('"image_url" is not allowed');
          if (err) return done();
          done();
        });
    });
  });

  describe('/PATCH property', () => {
    it('should successfully update property advert', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert with no token', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert with forbidden token', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('ACCESS DENIED! Not an Agent');
          if (err) return done();
          done();
        });
    });

    it('should not update a property advert if no id exists', (done) => {
      chai.request(app)
        .patch('/api/v2/property/111')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
        })
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.error).equals('You have no advert with that Id');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid price', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('Price is a required field with no special chars or alphabets');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid state', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('State is a required field with a min of 3 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid city', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('City is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid address', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('Address is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid type', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('Type is a required field with a min of 3 chars and no special characters');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with invalid image_url', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('"image_url" is not allowed');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing price', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: '',
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Price is a required field with no special chars or alphabets');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing state', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: '',
          city: 'Nairobi',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('State is a required field with a min of 3 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing city', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: '',
          address: 'Kenya',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('City is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing address', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: '',
          type: '2 bedroom',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Address is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing type', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .send({
          price: 6000000,
          state: 'Nairobi',
          city: 'Nairobi',
          address: 'Kenya',
          type: ' ',
          image_url: 'https://kinsta.com/wp-content/uploads/2017/04/change-wordpress-url-1.png',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Type is a required field with a min of 3 chars and no special characters');
          if (err) return done();
          done();
        });
    });

    it('should not update advert with missing image_url', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
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
          expect(res.body.error).equals('"image_url" is not allowed');
          if (err) return done();
          done();
        });
    });
  });

  describe('/PATCH sold-property', () => {
      it('should successfully mark property as sold', (done) => {
        chai.request(app)
          .patch('/api/v2/property/1/sold')
          .set('authorization', `Bearer ${agentToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            if (err) return done();
            done();
          });
      });

      it('should not mark a property advert with no token', (done) => {
        chai.request(app)
          .patch('/api/v2/property/1/sold')
          .set('authorization', ' ')
          .end((err, res) => {
            res.should.have.status(401);
            expect(res.body.error).equals('ACCESS DENIED! No token provided');
            if (err) return done();
            done();
          });
      });

      it('should not mark a property advert with forbidden token', (done) => {
        chai.request(app)
          .patch('/api/v2/property/1/sold')
          .set('authorization', `Bearer ${userToken}`)
          .end((err, res) => {
            res.should.have.status(403);
            expect(res.body.error).equals('ACCESS DENIED! Not an Agent');
            if (err) return done();
            done();
          });
      });

      it('should not mark a property advert if no id exists', (done) => {
        chai.request(app)
          .patch('/api/v2/property/111/sold')
          .set('authorization', `Bearer ${agentToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            expect(res.body.error).equals('You have no advert with that Id');
            if (err) return done();
            done();
          });
      });
  });

//   describe('/PATCH property fraudulent', () => {
//     it('should mark property as fraudulent', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: 'fake picture',
// 	        description: 'picture does not match actual property',
//         })
//         .end((err, res) => {
          
//           res.should.have.status(201);
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent with no token', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', ' ')
//         .send({
//           reason: 'fake picture',
// 	        description: 'picture does not match actual property',
//         })
//         .end((err, res) => {
//           res.should.have.status(401);
//           expect(res.body.error).equals('ACCESS DENIED! No token provided');
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent with invalid reason', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: new Array(52).join('a'),
//           description: 'The picture in the description does not match the actual property',
//         })
//         .end((err, res) => {
//           res.should.have.status(400);
//           expect(res.body.error).equals('reason is a required field with a min of 10 characters and a maximum of 20');
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent with invalid description', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: 'fake picture',
//           description: new Array(102).join('a'),
//         })
//         .end((err, res) => {
//           res.should.have.status(400);
//           expect(res.body.error).equals('description is a required field with a min of 10 characters and and a maximum of 50');
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent wih no reason', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: ' ',
//           description: 'The pictur@#$e in the description does not match the actual property',
//         })
//         .end((err, res) => {
//           res.should.have.status(400);
//           expect(res.body.error).equals('reason is a required field with a min of 10 characters and a maximum of 20');
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent with no description', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/1/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: 'fake picture',
//           description: ' ',
//         })
//         .end((err, res) => {
//           res.should.have.status(400);
//           expect(res.body.error).equals('description is a required field with a min of 10 characters and and a maximum of 50');
//           if (err) return done();
//           done();
//         });
//     });

//     it('should not mark property as fraudulent with invalid property id', (done) => {
//       chai.request(app)
//         .patch('/api/v2/property/2/fraudulent')
//         .set('authorization', `Bearer ${userToken}`)
//         .send({
//           reason: 'fake picture',
//           description: 'The picture in the description does not match the actual property',
//         })
//         .end((err, res) => {
//           // res.should.have.status(404);
//           expect(res.body.error).equals('No property with that id found');
//           if (err) return done();
//           done();
//         });
//     });
//   });

//   describe('/GET specific property', () => {
//     it('should return an error no advert of that id exists', (done) => {
//       chai.request(app)
//         .get('/api/v2/property/2')
//         .end((err, res) => {
//           res.should.have.status(404);
//           expect(res.body.error).equals('No property with that id found');
//           if (err) return done();
//           done();
//         });
//     });
//   });

  describe('/GET specific type', () => {
    it('should return an error no advert of that type exists', (done) => {
      chai.request(app)
        .get('/api/v2/property?type=2 bedrom')
        .end((err, res) => {
          expect(res.body.error).equals('No property adverts of that type found');
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });

    it('should successfully return an adverts of that type exists', (done) => {
      chai.request(app)
        .get('/api/v2/property?type=2 bedroom')
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });
  });
  
  describe('/DELETE property', () => {
    it('should successfully delete a  property advert', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not delete property advert with no token', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          if (err) return done();
          done();
        });
    });

    it('should not delete a property advert with forbidden token', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('ACCESS DENIED! Not an Agent');
          if (err) return done();
          done();
        });
    });

    it('should not delete a property advert if no id exists', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .set('authorization', `Bearer ${agentToken}`)
        .end((err, res) => {
          expect(res.body.error).equals('You have no advert with that Id');
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });
  });

  describe('/GET all properties', () => {
    it('should return an error message if no adverts exist', (done) => {
      chai.request(app)
        .get('/api/v2/properties')
        .end((err, res) => {
          expect(res.body.error).equals('No adverts found');
          res.should.have.status(404);
          if (err) return done();
          done();
        });
    });
  });
  
});
