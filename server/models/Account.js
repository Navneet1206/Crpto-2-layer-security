import { Schema, model } from 'mongoose';

const accountSchema = new Schema({
  publicKey: {
    type: String,
    required: true,
    unique: true,
  },
  privateKey: {
    type: String,
    required: true,
    unique: true,
  },
  superKeyHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Account = model('Account', accountSchema);