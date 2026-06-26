import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('oneDropBloodDatabase');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
      },
      gender: {
        type: 'string',
        required: false,
      },
      district: {
        type: 'string',
        required: false,
      },
      upazila: {
        type: 'string',
        required: false,
      },
      bloodGroup: {
        type: 'string',
        required: false,
      },
      profilePhoto: {
        type: 'string',
        required: false,
      },
      role: {
        type: 'string',
        default: 'donor',
      },
      status: {
        type: 'string',
        default: 'active',
      },
      donationCount: {
        type: 'string',
        default: '0',
      },
    },
  },
});
