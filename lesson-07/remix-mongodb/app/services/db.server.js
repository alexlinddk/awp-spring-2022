import { MongoClient } from "mongodb";

const DATABASE_NAME = "shop";

let db;

export async function getDb() {
  if (db) return db;

  let client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });

  if (process.env.NODE_ENV === "production") {
    await client
      .connect()
      .then(() => {
        console.log("MONGODB connected, production");
      })
      .catch(() => {
        console.error("MONGODB connection FAILED, production");
      });
    db = client.db(DATABASE_NAME);
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__client) {
      global.__client = client;
      await global.__client
        .connect()
        .then(() => {
          console.log("MONGODB connected, development");
        })
        .catch(() => {
          console.error("MONGODB connection FAILED, development");
        });
    }
    db = global.__client.db(DATABASE_NAME);
  }
  return db;
}

export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}
