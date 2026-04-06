import { Redis } from "@upstash/redis";
import { configDotenv } from "dotenv";

configDotenv();
const redis = Redis.fromEnv();

export default redis;
