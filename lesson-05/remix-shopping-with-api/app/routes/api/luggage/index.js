import db from "~/db/luggage/db.server.js";

export async function loader() {
  return db.data.products ?? [];
}
