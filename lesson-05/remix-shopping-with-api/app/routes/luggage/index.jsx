import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch("http://localhost:3000/api/luggage");
}

export default function LuggageItems() {
  const products = useLoaderData();

  return (
    <div>
      <PageHeader title="Luggage" subtitle="Curated by Dan">
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded border border-gray-200 bg-gray-50 p-5">
            <Link to={product.id} className="font-semibold">
              <h3>{product.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
