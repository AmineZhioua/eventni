import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Define a custom type for cached to include conn and promise properties
interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const cached: Cached = { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error("MongoDB URI is missing!");
    }

    // Create a connection promise if it doesn't already exist
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: "eventni",
        bufferCommands: false,
    });

    // Wait for the promise to resolve and store the connection
    cached.conn = await cached.promise;

    return cached.conn;
};
