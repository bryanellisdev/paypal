import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

import '~/styles/style.css'

export const meta = () => {
  return [{ title: "Nerd Swagger Store" }];
};

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="addHeader">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
