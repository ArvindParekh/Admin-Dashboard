import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./routes/user.jsx";
import { NewUser } from "./routes/new-user.jsx";
import Login from "./routes/login.jsx";
import SignUp from "./routes/signup.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
   },
   {
      path: '/signup',
      element: <SignUp />,
   },
   {
      path:"users/:userId",
      element: <User />
   },
   {
      path: "users/:userId/edit",
      element: <NewUser />
   },
   // {
   //    path: "users/:userId/destroy",
   //    element: <NewUser />
   // },
   {
      path: "add-user",
      element: <NewUser />
   }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   // <React.StrictMode>
      <RouterProvider router={router} />
   // </React.StrictMode>
);
