import mongoose from "mongoose";
import { models } from "./models.js";

const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  if (NODE_ENV === "production") {
    throw new Error(
      "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
    );
  } else {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name."
    );
  }
}

// We reuse any existing Mongoose db connection to avoid creating multiple
// connections in dev mode when Remix "purges the require cache" when reloading
// on file changes.
export default async function connectDb() {
  // Reuse the existing Mongoose connection if we have one...
  if (mongoose.connection?.readyState > 0) {
    return mongoose.connection;
  }

  // ...or create a new connection:
  const conn = await mongoose
    .connect(MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((connection) => {
      console.log("Mongoose connected in %s", NODE_ENV);
      return connection;
    });

  // "Models are always scoped to a single connection."
  // https://mongoosejs.com/docs/connections.html#multiple_connections
  // So we set them up here to avoid overwriting and getting errors in dev mode.
  for (const model of models) {
    conn.model(model.name, model.schema, model.collection);
  }

  return conn;
}
