import { createClient } from 'redis';

const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redisClient = createClient({
  url,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export default redisClient;
