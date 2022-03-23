import path from "path";
import { JSONFileSync, LowSync } from "lowdb";

const file = path.join(__dirname, "../app/db/luggage/db.json");
const adapter = new JSONFileSync(file);
const db = new LowSync(adapter);

db.read();
export default db;
