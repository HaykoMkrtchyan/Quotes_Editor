import { Schema, model } from 'mongoose';

const quoteScema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export const Quote = model('Quote', quoteScema);
