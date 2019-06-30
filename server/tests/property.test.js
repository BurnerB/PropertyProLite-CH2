import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('/PROPERTY', () => {
  describe('/POST property', () => {
    it('should successfully post a property advert', (done) => {
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

    it('should not  post a property advert with missing status', (done) => {
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

    it('should not  post a property advert with missing price', (done) => {
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

    it('should not  post a property advert with missing state', (done) => {
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

    it('should not  post a property advert with missing city', (done) => {
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

    it('should not  post a property advert with missing address', (done) => {
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

    it('should not  post a property advert with missing type', (done) => {
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

    it('should not  post a property advert with missing image_url', (done) => {
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

    it('should not  post a property advert with invalid status', (done) => {
      chai.request(app)
        .post('/api/v1/property')
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
});
