import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!dbName) {
  throw new Error('Please add your MongoDB database name to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent re-creating the client.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each request.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Create a function to get the database instance
export async function connectdb() {
  const client = await clientPromise;
  return client.db(dbName);
}
