
import express, { Request, Response } from 'express';
import cors from 'cors'; 
import { redisClient, connectRedis } from './redis';
import { sequelize } from './db';
import { Post } from './models/Post';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get('/cache/posts', async (req: Request, res: Response) => {
  try {
    const cachedPosts = await redisClient.get('posts');
    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    const posts = await Post.findAll();
    await redisClient.setEx('posts', 30, JSON.stringify(posts));
    return res.json(posts);
  } catch (err: any) {
    console.error('Error in /cache/posts:', err);
    return res.status(500).json({ error: err.message });
  }
});

app.get('/cache/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cacheKey = `post:${id}`;
    const cachedPost = await redisClient.get(cacheKey);
    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await redisClient.setEx(cacheKey, 60, JSON.stringify(post));
    return res.json(post);
  } catch (err: any) {
    console.error('Error in /cache/posts/:id:', err);
    return res.status(500).json({ error: err.message });
  }
});


export default app;

if (require.main === module) {
  (async () => {
    try {
      await connectRedis();
      app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`)
      );
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  })();
}



