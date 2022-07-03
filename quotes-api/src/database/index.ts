import { set, connect } from 'mongoose';
import { getMongoURI } from './config';
import { config } from 'dotenv';

config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const URI = getMongoURI(DB_NAME, DB_USERNAME, DB_PASSWORD);

connect(URI, () => {
    console.log('Connected to database'); set('toJSON', {
        virtuals: true,
        transform: (_, ret) => { delete ret._id; delete ret.__v }
    })
});
