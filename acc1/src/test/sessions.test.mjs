import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Sessions API', function() {
  
  // Register a new user
  describe('POST /api/sessions/register', function() {
    it('should register a new user', function(done) {
      request(app)
        .post('/api/sessions/register')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
          first_name: 'Test',
          last_name: 'User',
          age: 25
        })
        .expect(302) // Assuming successful registration redirects to login
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.headers.location).to.equal('/api/sessions/login');
          done();
        });
    });


  });

  // Login a user
  describe('POST /api/sessions/login', function() {
    it('should login an existing user', function(done) {
      request(app)
        .post('/api/sessions/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).to.equal('Logged in successfully');
          expect(res.headers['set-cookie']).to.exist;
          done();
        });
    });

    it('should not login with incorrect password', function(done) {
      request(app)
        .post('/api/sessions/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).to.equal('Invalid email or password');
          done();
        });
    });

    it('should not login with non-existent email', function(done) {
      request(app)
        .post('/api/sessions/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).to.equal('Invalid email or password');
          done();
        });
    });
  });

  // Logout a user
  describe('GET /api/sessions/logout', function() {
    it('should logout the user', function(done) {
      request(app)
        .get('/api/sessions/logout')
        .expect(302) // Assuming logout redirects to login page
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.headers.location).to.equal('/api/sessions/login');
          done();
        });
    });
  });


});
