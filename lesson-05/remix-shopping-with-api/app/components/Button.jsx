import { Link } from "remix";

export default function Button({ type, destructive = false, children }) {
  let className = `${
    destructive ? "bg-red-500" : "bg-blue-500"
  } text-white font-bold py-2 px-4 rounded my-3 inline-block`;

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
