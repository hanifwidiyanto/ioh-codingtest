import request from 'supertest';
import app from '../app.js';

describe('Item Controllers', () => {
  let token;

  beforeAll(async () => {
    // Log in to get the authentication token
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'updated31@example.com', password: 'newpassword' });

    token = response.body.token;
  });

  afterAll(async () => {
    // Log out to invalidate the authentication token
    await request(app).post('/api/users/logout');
  });

  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .set('Cookie', [`jwt=${token}`])
      .send({
        item_name: 'Test Item',
        price: 9.99,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.item).toBeDefined();
  });

  it('should get all items', async () => {
    const response = await request(app).get('/api/items');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toBeDefined();
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  it('should get an item by ID', async () => {
    const newItemResponse = await request(app)
      .post('/api/items')
      .set('Cookie', [`jwt=${token}`])
      .send({
        item_name: 'Test Item',
        price: 9.99,
      });

    const itemId = newItemResponse.body.item.item_id;

    const response = await request(app).get(`/api/items/${itemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.item).toBeDefined();
  });

  it('should delete an item by ID', async () => {
    const newItemResponse = await request(app)
      .post('/api/items')
      .set('Cookie', [`jwt=${token}`])
      .send({
        item_name: 'Test Item',
        price: 9.99,
      });

    const itemId = newItemResponse.body.item.item_id;

    const response = await request(app).delete(`/api/items/${itemId}`);

    expect(response.statusCode).toBe(204);
  });
});
