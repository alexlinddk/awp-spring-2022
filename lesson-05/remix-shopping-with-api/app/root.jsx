import {
  Link,
  NavLink,
  Outlet,
  LiveReload,
  Links,
  Meta,
  Scripts,
  useCatch,
} from "remix";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = () => ({
  description: "A collection of great recipes",
  keywords: "cooking, food, recipes",
});

export default function App() {
  return (
    <Document title="Remixed Recipes">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body className="bg-slate-100 text-gray-800">
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <header className="container mx-auto">
        <nav className="text-left">
          <Link to="/" className="group transition-colors mt-5 mb-6 block">
            <span className="block font-extrabold text-4xl text-amber-500 group-hover:text-orange-400 ">
              Kablamazon
            </span>
            <span className="block font-semibold italic text-gray-400 group-hover:text-orange-400 ">
              Shop for anything
            </span>
          </Link>
        </nav>
      </header>
      <div className="container mx-auto flex flex-row">
        <nav className="bg-gray-50 border border-gray-200 rounded mr-6 shadow-inner">
          <MenuLink to="/luggage">Luggage</MenuLink>
          <MenuLink to="/books">Books</MenuLink>
          <MenuLink to="/electronics">Electronics</MenuLink>
          <MenuLink to="/computers">Computers</MenuLink>
          <MenuLink to="/toys">Toys</MenuLink>
          <MenuLink to="/music">Music</MenuLink>
          <MenuLink to="/musical-instruments">Musical instruments</MenuLink>
          <MenuLink to="/movies">Movies</MenuLink>
          <MenuLink to="/sports">Sports equipment</MenuLink>
          <MenuLink to="/video-games">Video games</MenuLink>
          <MenuLink to="/home-and-kitchen">Home and kitchen</MenuLink>
          <MenuLink to="/crafts">Arts and crafts</MenuLink>
          <MenuLink to="/beauty">Beauty and personal care</MenuLink>
          <MenuLink to="/womens-fashion">Women's fashion</MenuLink>
          <MenuLink to="/mens-fashion">Men's fashion</MenuLink>
          <MenuLink to="/kids-fashion">Kid's fashion</MenuLink>
          <MenuLink to="/pet-supplies">Pet supplies</MenuLink>
        </nav>
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
}

function MenuLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block hover:bg-gray-200 transition-all text-lg font-bold px-4 py-1 ${
          isActive ? "bg-gray-200" : ""
        }`
      }>
      {children}
    </NavLink>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <Layout>
        <div className="bg-red-100 text-red-700 border border-red-200 p-4 rounded">
          <h1 className="text-2xl mb-3 font-bold">Error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document>
      <Layout>
        <div className="bg-red-100 text-red-700 border border-red-200 p-4 rounded">
          <h1 className="text-2xl mb-3 font-bold">Whoops</h1>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </Layout>
    </Document>
  );
}
