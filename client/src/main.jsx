import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import "./index.css";
import App from "./App"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"

function RequireAuth({ children }) {
  let location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "chats",
        element: (
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        )
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);