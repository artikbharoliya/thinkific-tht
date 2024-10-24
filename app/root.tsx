import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Layout } from "./components/Layout";
import './styles/style.css'
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getUserDataFromRequest } from "./auth/auth";

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserDataFromRequest(request);
  return json(userId);
};

export default function App() {
  const userId = useLoaderData<string>();
  return (
    <Document>
      <Layout userId={userId}>
        <Outlet />
      </Layout>
    </Document>
  );
}
