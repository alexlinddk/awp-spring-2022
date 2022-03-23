import React from "react";
import { Link } from "remix";

export default function Breadcrumb({ links = [] }) {
  const breadcrumbs = [{ to: "/", title: "Home" }, ...links];

  return (
    <nav className="mb-4 text-sm font-semibold">
      {breadcrumbs.map((link, i) => (
        <React.Fragment key={i}>
          {i !== 0 && (
            <span className="inline-block mx-2 text-gray-400">/</span>
          )}
          <Link to={link.to} className="text-blue-700 hover:underline">
            {link.title}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
