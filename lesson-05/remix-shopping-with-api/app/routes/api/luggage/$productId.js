import db from "~/db/luggage/db.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}
