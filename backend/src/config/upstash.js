import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new Ratelimit instance
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s") // 100 requests per 60 seconds
});

export default rateLimit;