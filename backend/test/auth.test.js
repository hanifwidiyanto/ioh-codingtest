import request from 'supertest';
import app from '../app.js';

describe('User Controllers', () => {
  let token;

  describe('POST /api/users/register', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({ email: 'newuser261@example.com', password: 'password', confPassword: 'password' })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('newuser261@example.com');
    });

    it('should return an error if passwords do not match', async () => {
      await request(app)
        .post('/api/users/register')
        .send({ email: 'newuser@example.com', password: 'password', confPassword: 'differentpassword' })
        .expect(400);
    });

    it('should return an error if user already exists', async () => {
      await request(app)
        .post('/api/users/register')
        .send({ email: 'test@example.com', password: 'password', confPassword: 'password' })
        .expect(400);
    });
  });

  describe('POST /api/users/login', () => {
    it('should return an error if user is not found', async () => {
      await request(app)
        .post('/api/users/login')
        .send({ email: 'unknown@example.com', password: 'password' })
        .expect(400);
    });

    it('should return an error if password is incorrect', async () => {
      await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('should log in and return an authentication token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'newuser259@example.com', password: 'password' })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('newuser259@example.com');

      token = response.body.token;
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update the user profile', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Cookie', [`jwt=${token}`])
        .send({ email: 'updated37@example.com', password: 'newpassword' })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('updatedUser');
      expect(response.body.updatedUser.email).toBe('updated37@example.com');
    });
  });

  describe('POST /api/users/login', () => {
   

    it('should log in and return an authentication token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'updated37@example.com', password: 'newpassword' })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('updated37@example.com');

      token = response.body.token;
    });
  });


  describe('GET /api/users/profile', () => {
    it('should get the user profile', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Cookie', [`jwt=${token}`])
        .expect(200);

      expect(response.body).toHaveProperty('users');
      expect(response.body.users.email).toBe('updated37@example.com');
    });
  });

  describe('POST /api/users/logout', () => {
    it('should log out and invalidate the authentication token', async () => {
      await request(app)
        .post('/api/users/logout')
        .set('Cookie', [`jwt=${token}`])
        .expect(200);
    });
  });
});
