import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('/PROPERTY', () => {
  describe('/POST property', () => {
    it('should successfully post an property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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
    
    it('should not  post an property advert with missing status', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing price', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing state', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing city', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing address', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing type', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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

    it('should not  post an property advert with missing image_url', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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
  });
});
