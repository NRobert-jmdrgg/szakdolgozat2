import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./views/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.AUTH0_DOMAIN as string}
      clientId={import.meta.env.AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
