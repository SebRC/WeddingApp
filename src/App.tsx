import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { ErrorPage } from "./components/error/ErrorPage";
import { AdminRoute, AuthRoute, GiftsRoute, GuestRoute, InfoRoute, SettingsRoute } from "./routing/routes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [GuestRoute, InfoRoute, AdminRoute, GiftsRoute, SettingsRoute],
    },
    { path: AuthRoute.path, element: AuthRoute.element },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
