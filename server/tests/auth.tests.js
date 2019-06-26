import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('/Authen',()=>{
  describe('/POST signup',()=>{
    it('should successfully sign up user', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(201);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing email', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: ' ',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing firstname', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: '',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing lastname', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: '',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing password', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: '',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing phonenumber', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber:'',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should not sign up user with missing address', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: ''	
        })
        .end((err,res)=>{
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should check if the email has already been used to register', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'johndoe@gmail.com',
          firstname: 'John',
          lastname: 'Ndomimi',
          password: 'abu1234',
          phoneNumber:'+254700000000',
          address: 'Kenya'	
        })
        .end((err,res)=>{
          res.should.have.status(409);
          if (err) return done();
          done();
        });
    });
  });
});