import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/Authen', () => {
  describe('/POST signup', () => {
  
    it.skip('should successfully sign up user', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(201);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing email', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: ' ',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing firstname', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: '',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Firstname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing lastname', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: '',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Lastname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing password', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: '',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing phonenumber', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber: '',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('phoneNumber is a required field with a min of 10 numbers and no special chars or letters');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing address', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: '',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Address is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing is_Agent', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('is_Agent is a required field and can only be true or false');
          if (err) return done();
          done();
        });
    });

    it('should check if the email has already been used to register', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(409);
          expect(res.body.error).equals('The email has already been used to register');
          expect(res.body).to.have.property('status');
          if (err) return done();
          done();
        });
    });

    it('should check if the email is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoegmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should check if the firstname is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoegmail.com',
          firstname: 'John123',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Firstname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should check if the lastname is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoegmail.com',
          firstname: 'John',
          lastname: 'Ndomimi1',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Lastname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          done();
        });
    });

    it('should check if the password is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu12340000000000000000000',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should check if the phonenumber is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '+25470000ad00',
          address: 'Kenya',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('phoneNumber is a required field with a min of 10 numbers and no special chars or letters');
          if (err) return done();
          done();
        });
    });

    it('should check if the address is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '+25470000ad00',
          address: '@#4',
          is_Agent: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Address is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should check if is_Agent is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber: '0700000000',
          address: 'Kenya',
          is_Agent: 'maybe',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('is_Agent is a required field and can only be true or false');
          if (err) return done();
          done();
        });
    });
  });
  describe('/POST login', () => {
    it('should successfully login user', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'johndoe@gmail.com',
          password: 'abu1234',
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should not login user without email', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: ' ',
          password: 'abu1234',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should not login user without password', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'johndoe@gmail.com',
          password: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });

    it('should not login user with mismatch password', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'johndoe@gmail.com',
          password: 'abu1200',
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.error).equals('Incorrect password Email combination');
          if (err) return done();
          done();
        });
    });

    it('should not login user not registered', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'janedoe@gmail.com',
          password: 'abu1234',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email not found, sign up to create an account');
          if (err) return done();
          done();
        });
    });

    it('should check if email is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'janedoegmail.com',
          password: 'abu1234',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          done();
        });
    });

    it('should check if password is valid', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'janedoe@gmail.com',
          password: 'abu1234000000000000000',
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          done();
        });
    });
  });

  // describe('/POST reset', () =>{
  //   it('should successfully reset password', (done) => {
  //     chai.request(app)
  //       .post('/api/v2/auth/reset')
  //       .send({
  //         email: 'johndoe@gmail.com',
  //         phoneNumber: '0700000000',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         if (err) return done();
  //         done();
  //       });
  //   });

  //   it('should not reset password with missing email', (done) => {
  //     chai.request(app)
  //       .post('/api/v2/auth/reset')
  //       .send({
  //         email: ' ',
  //         phoneNumber: '0700000000',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         expect(res.body.error).equals('Email is a required field and must be valid');
  //         if (err) return done();
  //         done();
  //       });
  //   });

  //   it('should not reset password with missing phoneNumber', (done) => {
  //     chai.request(app)
  //       .post('/api/v2/auth/reset')
  //       .send({
  //         email: 'johndoe@gmail.com',
  //         phoneNumber: ' ',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         expect(res.body.error).equals('phoneNumber is an opional field with a min of 10 numbers and no special chars or letters');
  //         if (err) return done();
  //         done();
  //       });
  //   });

  //   it('should not reset password with invalid phoneNumber', (done) => {
  //     chai.request(app)
  //       .post('/api/v2/auth/reset')
  //       .send({
  //         email: 'johndoe@gmail.com',
  //         phoneNumber: 'a_number',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         expect(res.body.error).equals('phoneNumber is an opional field with a min of 10 numbers and no special chars or letters');
  //         if (err) return done();
  //         done();
  //       });
  //   });

  //   it('should not reset password with invalid email', (done) => {
  //     chai.request(app)
  //       .post('/api/v2/auth/reset')
  //       .send({
  //         email: 'johndoegmail.com',
  //         phoneNumber: '0700000000',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         expect(res.body.error).equals('Email is a required field and must be valid');
  //         if (err) return done();
  //         done();
  //       });
  //   });
    
  // })
});
