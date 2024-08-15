import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Adjust the path to your app

describe('Cart API', function() {
  
  // Create a new cart
  describe('POST /api/cart', function() {
    it('should create a new cart', function(done) {
      request(app)
        .post('/api/cart')
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'cart created');
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  // Get cart by ID
  describe('GET /api/cart/:cid', function() {
    let cartId;

    before(function(done) {
      request(app)
        .post('/api/cart')
        .end(function(err, res) {
          if (err) return done(err);
          cartId = res.body.id;
          done();
        });
    });

    it('should get a cart by ID', function(done) {
      request(app)
        .get(`/api/cart/${cartId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('_id', cartId);
          expect(res.body).to.have.property('products');
          done();
        });
    });

    
  });

  // Add product to cart
  describe('PUT /api/cart/:cid/:pid', function() {
    let cartId, productId;

    before(function(done) {
      // Create a new cart and product for testing
      request(app)
        .post('/api/cart')
        .end(function(err, res) {
          if (err) return done(err);
          cartId = res.body.id;

          // Assuming there's an endpoint to create products
          request(app)
            .post('/api/products')
            .send({
              name: 'Test Product',
              price: 10.00
            })
            .end(function(err, res) {
              if (err) return done(err);
              productId = res.body.id;
              done();
            });
        });
    });

    it('should add a product to the cart', function(done) {
      request(app)
        .put(`/api/cart/${cartId}/${productId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('cart', cartId);
          expect(res.body).to.have.property('products');
          done();
        });
    });
  });

  // Delete product from cart
  describe('DELETE /api/cart/:cid/:pid', function() {
    let cartId, productId;

    before(function(done) {
      // Create a new cart and product for testing
      request(app)
        .post('/api/cart')
        .end(function(err, res) {
          if (err) return done(err);
          cartId = res.body.id;

          // Assuming there's an endpoint to create products
          request(app)
            .post('/api/products')
            .send({
              name: 'Test Product',
              price: 10.00
            })
            .end(function(err, res) {
              if (err) return done(err);
              productId = res.body.id;

              // Add product to cart
              request(app)
                .put(`/api/cart/${cartId}/${productId}`)
                .end(done);
            });
        });
    });

    
  });

  // Purchase cart
  describe('POST /api/cart/:cid/purchase', function() {
    let cartId, productId, token;

    before(function(done) {
      // Create a new cart and product for testing
      request(app)
        .post('/api/cart')
        .end(function(err, res) {
          if (err) return done(err);
          cartId = res.body.id;

          // Assuming there's an endpoint to create products
          request(app)
            .post('/api/products')
            .send({
              name: 'Test Product',
              price: 10.00
            })
            .end(function(err, res) {
              if (err) return done(err);
              productId = res.body.id;

              // Add product to cart
              request(app)
                .put(`/api/cart/${cartId}/${productId}`)
                .end(function(err, res) {
                  if (err) return done(err);

                  // Login user to get token
                  request(app)
                    .post('/api/sessions/login')
                    .send({
                      email: 'testuser@example.com',
                      password: 'password123'
                    })
                    .end(function(err, res) {
                      if (err) return done(err);
                      token = res.body.token;
                      done();
                    });
                });
            });
        });
    });

    
  });
});
