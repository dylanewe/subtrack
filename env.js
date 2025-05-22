import { config } from 'dotenv';

// Load the .env file from project root
config();

export const { 
    PORT, SERVER_URL,
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_TOKEN, QSTASH_URL,
    EMAIL_PASSWORD, EMAIL_ADDRESS
} = process.env;