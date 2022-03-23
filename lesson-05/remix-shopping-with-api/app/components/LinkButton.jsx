import { Link } from "remix";

export default function Button({ to, children }) {
  return (
    <Link
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-3 inline-block"
      to={to}>
      {children}
    </Link>
  );
}
