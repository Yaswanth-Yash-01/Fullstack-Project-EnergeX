 
import request from 'supertest';
import app from './index';
import { sequelize } from './db';
import { connectRedis, redisClient } from './redis';
import { Post } from './models/Post';

beforeAll(async () => {
  await sequelize.sync({ force: true });


  if (!redisClient.isOpen) {
    await connectRedis();
  }
  await redisClient.flushAll();

  await Post.create({ title: 'Test Post 1', content: 'Hello World' });
  await Post.create({ title: 'Test Post 2', content: 'Second Post' });
});

afterAll(async () => {
  await sequelize.close();


  if (redisClient.isOpen) {
    await redisClient.quit();
  }
});

describe('Cache Endpoints (Integration)', () => {
  it('should fetch all posts from cache or DB', async () => {
    const res = await request(app).get('/cache/posts').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('should fetch a post by ID', async () => {
    const res = await request(app).get('/cache/posts/1').expect(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title', 'Test Post 1');
  });
});
